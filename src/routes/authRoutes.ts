import express, {Request, Response} from 'express';
import { getRepository } from 'typeorm';
// import { users} from "entities/Client";
import bcrypt from "bcrypt";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import { Client } from '../entities/Client';