import { Request, Response } from "express";
import { userRepository } from '../../repository/UserRepository'
import { User } from "../../entity/User";
import { UserService } from "../../service/UserService";
import { BillingRepository } from "../../repository/BillingRepository";
import { Billing } from "../../entity/Billing";
import { Status, validateStatus } from "../../entity/Status";
import { userPlans } from "../../entity/userPlan";

export class BillingController {
  static async getUserBilling(req: Request, res: Response) {
    try {
      const { ids } = req.params;
      const id = parseInt(ids);
      const user = await userRepository(User).findOne({
        where: { id },
        relations: ['billing']
      });
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      return res.status(200).json({ message: "User billing data", billing: user.billing });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  static async setBilling(req: Request, res: Response) {
    try {
      const { ids } = req.params;
      const id = parseInt(ids);
      const { method } = req.body;
      const user = await userRepository(User).findOne({
        where: { id },
        relations: ['billing']
      });
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const WAIT_TIME: number = 30;
      const schedule: string = "monthly"

      const selectedPlan = userPlans.find(plan => plan.name.toLowerCase() === String(user.plan).toLowerCase());
  
      const billRepo = BillingRepository(Billing);
      const newBilling = new Billing();
      newBilling.ammount = selectedPlan.ammount;
      newBilling.description = selectedPlan.description;
      newBilling.plan = selectedPlan.plan;
      newBilling.method = method;
      newBilling.schedule = schedule;

      const date = new Date();
      date.setDate(date.getDate() + WAIT_TIME);

      newBilling.startAt = new Date(Date.now());
      newBilling.endAt = date;

      newBilling.status = user.billing.endAt < new Date() ? validateStatus(Status.UNPAID) : validateStatus(Status.PENDING);

      newBilling.user = user;
      await billRepo.save(newBilling);
      user.billing = newBilling;
      await userRepository(User).save(user);

      const { userDataResponse } = UserService(user);
  
      return res.status(200).json({ message: "Billing set successfully", userDataResponse, newBilling });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error creating billing" });
    }
  }

  static async updateBilling(req: Request, res: Response) {
    try {
      const { ids } = req.params;
      const id = parseInt(ids);
      const { method, schedule, status }: { method: string, schedule: string, status: Status } = req.body;
  
      const billRepo = BillingRepository(Billing);
      const billing = await billRepo.findOneOrFail({
        where: { id },
        relations: ['user']
      });
  
      if (!billing) {
        return res.status(404).json({ code: 404, message: 'Resource not found' });
      }
  
      if (method) billing.method = method;
      if (schedule) billing.schedule = schedule;
      if (status) billing.status = status;
  
      const user = await userRepository(User).findOneOrFail({
        where: { id: billing.user.id },
        relations: ['billing']
      });
  
      const selectedPlan = userPlans.find(plan => plan.name.toLowerCase() === String(user.plan).toLowerCase());
      if (selectedPlan) {
        billing.ammount = selectedPlan.ammount;
        billing.description = selectedPlan.description;
        billing.plan = selectedPlan.plan;
      }
  
      await billRepo.save(billing);
      user.billing = billing;
      await userRepository(User).save(user);
  
      return res.status(200).json({ message: 'Billing updated successfully', billing });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error updating billing" });
    }
  }

  
  static async deleteBilling(req: Request, res: Response) {
    try {
      const { ids } = req.params;
      const id = parseInt(ids);
      const billingRepository = BillingRepository(Billing);
      const billing = await billingRepository.findOne({
        where:{id}
      });

      if (!billing) {
        return res.status(404).json({ message: "Billing not found" });
      }

      const userId = billing.user.id;
      await billingRepository.remove(billing);

      // Update user's billing reference to null
      await userRepository(User).createQueryBuilder().update().set({ billing: null }).where("id = :id", { id: userId }).execute();

      return res.status(200).json({ message: "Billing deleted successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  static async home(req: Request, res: Response) {
    try {
      res.status(200).json({ message: "Hello world" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}
