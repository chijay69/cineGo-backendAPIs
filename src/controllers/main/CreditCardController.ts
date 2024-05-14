import { CreditCard } from "../../entity/CreditCard";
import { User } from "../../entity/User";
import { creditCardRepository } from "../../repository/CreditCardRepository";
import { userRepository } from "../../repository/UserRepository";
import { Request, Response } from "express";
import * as cache from "memory-cache";

function isCreditCardValid(cardNumber: string): boolean {
  // Remove any non-digit characters
  const cleanedCardNumber = cardNumber.replace(/\D/g, '');

  // Check if the card number is empty or not a number
  if (!cleanedCardNumber || isNaN(Number(cleanedCardNumber))) {
      return false;
  }

  // Luhn algorithm implementation
  let sum = 0;
  let doubleUp = false;
  for (let i = cleanedCardNumber.length - 1; i >= 0; i--) {
      let digit = parseInt(cleanedCardNumber.charAt(i), 10);
      if (doubleUp) {
          digit *= 2;
          if (digit > 9) {
              digit -= 9;
          }
      }
      sum += digit;
      doubleUp = !doubleUp;
  }

  return sum % 10 === 0;
}

function isExpiryDateValid(expiryDate: string): boolean {
  const regex = /^(0[1-9]|1[0-2])\/\d{2}$/;
  if (!regex.test(expiryDate)) {
      return false;
  }

  const [month, year] = expiryDate.split('/');
  const currentYear = new Date().getFullYear() % 100;
  const currentMonth = new Date().getMonth() + 1;
  if (parseInt(year, 10) < currentYear || (parseInt(year, 10) === currentYear && parseInt(month, 10) < currentMonth)) {
      return false;
  }

  return true;
}

function isCvvValid(cvv: string): boolean {
  const regex = /^[0-9]{3,4}$/;
  return regex.test(cvv);
}


export class CreditCardController {
  static async getAllCreditCards(req: Request, res: Response) {
    try {
      let creditCards = cache.get("creditCards");
      if (!creditCards) {
        console.log("Serving from database");
        creditCards = await creditCardRepository(CreditCard).find();
        cache.put("creditCards", creditCards, 6000);
      } else {
        console.log("Serving from cache");
      }

      return res.status(200).json({ creditCards });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  static async createCreditCard(req: Request, res: Response) {
    try {
      const { cardNumber, expiryDate, cvv, userId } = req.body;
      const user = await userRepository(User).findOne({where: {id: userId}});

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      if (!isCreditCardValid(cardNumber)) {
          console.log("Credit card number is not valid");
          return res.status(400).json({ message: "Credit card number is invalid"})
      }

      if (isExpiryDateValid(expiryDate)) {
        return res.status(400).json({message: "Expiry date is valid"})
      }

      if (isCvvValid(cvv)) {
        return res.status(400).json({message: "CVV is valid"})
      }

      const creditCardRepo = creditCardRepository(CreditCard);
      const creditCard = new CreditCard();
      creditCard.cardNumber = cardNumber;
      creditCard.expairyDate = expiryDate;
      creditCard.cvv = cvv;
      creditCard.user = user;

      await creditCardRepo.save(creditCard);
      return res.status(201).json({ message: "Credit card created successfully", creditCard });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  static async updateCreditCard(req: Request, res: Response) {
    try {
      const { ids } = req.params;
      const id = parseInt(ids);
      const { cardNumber, expairyDate, cvv } = req.body;
      const creditCardRepo = creditCardRepository(CreditCard);
      const creditCard = await creditCardRepo.findOne({ where: { id } });

      if (!creditCard) {
        return res.status(404).json({ message: "Credit card not found" });
      }

      creditCard.cardNumber = cardNumber || creditCard.cardNumber;
      creditCard.expairyDate = expairyDate || creditCard.expairyDate;
      creditCard.cvv = cvv || creditCard.cvv;

      await creditCardRepo.save(creditCard);
      return res.status(200).json({ message: "Credit card updated", creditCard });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  static async deleteCreditCard(req: Request, res: Response) {
    try {
      const { ids } = req.params;
      const id = parseInt(ids);
      const creditCardRepo = creditCardRepository(CreditCard);
      const creditCard = await creditCardRepo.findOneOrFail({
        where:{ id }
      });

      if (!creditCard) {
        return res.status(404).json({ message: "Credit card not found" });
      }

      await creditCardRepo.remove(creditCard);
      return res.status(200).json({ message: "Credit card deleted" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}
