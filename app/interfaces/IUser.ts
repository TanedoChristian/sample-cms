export default interface IUser {
  id?: number;
  firstname: string;
  lastname: string;
  address: {
    city: string;
  };
  email: string;
  phonenumber: string;
}
