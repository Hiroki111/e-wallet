import { Request, Response } from 'express';

export const allAccess = (_req: Request, res: Response): void => {
  res.status(200).send('Public Content.');
};

export const userBoard = (_req: Request, res: Response): void => {
  res.status(200).send('User Content.');
};

export const adminBoard = (_req: Request, res: Response): void => {
  res.status(200).send('Admin Content.');
};

export const moderatorBoard = (_req: Request, res: Response): void => {
  res.status(200).send('Moderator Content.');
};
