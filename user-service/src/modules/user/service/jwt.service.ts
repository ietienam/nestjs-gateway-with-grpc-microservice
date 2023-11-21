import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import config from '../../../config';

export class JwtService {

  // Decoding the JWT Token
  public async decode(token: string): Promise<unknown> {
    return jwt.decode(token);
  }

  // Generate JWT Token
  public generateToken(auth: any): string { //TODO: change "any"
    return jwt.sign({ id: auth.id, email: auth.email, role: auth.role }, config.jwtSecret);
  }

  // Validate User's password
  public isPasswordValid(password: string, userPassword: string): boolean {
    return bcrypt.compareSync(password, userPassword);
  }

  // Encode User's password
  public encodePassword(password: string): string {
    const salt: string = bcrypt.genSaltSync(10);

    return bcrypt.hashSync(password, salt);
  }

  // Validate JWT Token, throw forbidden error if JWT Token is invalid
  public async verify(token: string): Promise<any> {
    try {
      return jwt.verify(token, config.jwtSecret);
    } catch (err) {}
  }
}