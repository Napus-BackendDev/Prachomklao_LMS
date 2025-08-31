import { Injectable, NotFoundException } from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';
import { firestore } from 'config/firebase.config';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-admin.dto';

@Injectable()
export class UsersService {
  private usersCollection = firestore.collection('users');

  async findbyEmail(email: string) {
    const snapshot = await this.usersCollection
      .where('email', '==', email)
      .get();
    if (snapshot.empty) throw new NotFoundException();
    const doc = snapshot.docs[0];
    const data = doc.data()
    const userData = {
      id: doc.id,
      email: data.email,
      username: data.username,
      password: data.password,
      role: data.role
    }
    return userData;
  }

  async findAll() {
    const snapshot = await this.usersCollection.get();
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }

  async findOne(id: string) {
    const user = await this.usersCollection.doc(id).get();
    return user.data();
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const payload = instanceToPlain(updateUserDto);
    if (payload.password)
      payload.password = await bcrypt.hash(payload.password, 10);
    else delete payload.password;
    return await this.usersCollection.doc(id).update(payload);
  }

  remove(id: string) {
    this.usersCollection.doc(id).delete();
    return { message: 'Delect complete' };
  }
}
