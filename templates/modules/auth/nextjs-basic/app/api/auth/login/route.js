import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/models/User';
import { signToken } from '@/lib/auth';

export async function POST(req) {
  try {
    await connectDB();
    const { email, password } = await req.json();

    const isSequelize = !!User.sequelize;
    const user = isSequelize 
      ? await User.findOne({ where: { email } })
      : await User.findOne({ email }).select('+password');

    if (user && (await user.matchPassword(password))) {
      const userId = user.id || user._id;
      const token = signToken({ id: userId });

      const response = NextResponse.json({
        _id: userId,
        name: user.name,
        email: user.email,
        token,
      });

      response.cookies.set('token', token, {
        httpOnly: false,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
      });

      return response;
    } else {
      return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
