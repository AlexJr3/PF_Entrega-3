export class UserDto {
  constructor(user) {
    this.fullName = `${user.firstName} ${user.lastName}`;
    this.role = user.role;
    this.cart = user.cart;
    this.email = user.email;
  }
}
