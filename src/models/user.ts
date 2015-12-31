export class User {
  id: number;
  email: string;
  password: string;

  constructor(obj?: any) {
    this.id = obj && obj.id || null;
    this.email = obj && obj.email || null;
    this.password = obj && obj.password || null;
  }
}
