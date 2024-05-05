'use client';

import { Input } from '@/components';
import { AuthLayout } from '@/layouts/authLayout';
import { useRouter } from 'next/navigation';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';

interface IForm {
  name: string;
  lastName: string;
  username: string;
  password: string;
}

export default function SignUpPage() {
  const router = useRouter();
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<IForm>();

  // Function to handle form submission
  const onSubmit = (data: IForm) => {
    console.log('Form Data:', data);
    // Add your login logic here, such as calling an API
  };

  const onLoginClick = () => {
    router.push('/login');
  };

  return (
    <AuthLayout>
      <div className="w-96 p-4 mx-auto my-auto flex flex-col">
        <div className="space-y-4">
          <div>
            <h2 className="font-bold">خوش آمدید</h2>
            <p className="text-neutral-500">قرائت روزانه ۵۰ آیه از قرآن کریم</p>
          </div>
          <form
            className="flex flex-col space-y-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <Controller
                name="name"
                control={control}
                rules={{ required: 'نام الزامی است' }}
                render={({ field }) => <Input {...field} placeholder="نام" />}
              />
              {errors.username && (
                <p className="text-red-500">{errors.username.message}</p>
              )}
            </div>
            <div>
              <Controller
                name="lastName"
                control={control}
                rules={{ required: 'نام خانوادگی الزامی است' }}
                render={({ field }) => (
                  <Input {...field} placeholder="نام خانوادگی" />
                )}
              />
              {errors.username && (
                <p className="text-red-500">{errors.username.message}</p>
              )}
            </div>
            <div>
              <Controller
                name="username"
                control={control}
                rules={{ required: 'شماره پرسنلی الزامی است' }}
                render={({ field }) => (
                  <Input {...field} placeholder="شماره پرسنلی" />
                )}
              />
              {errors.username && (
                <p className="text-red-500">{errors.username.message}</p>
              )}
            </div>
            <div>
              <Controller
                name="password"
                control={control}
                rules={{ required: 'کلمه عبور الزامی است' }}
                render={({ field }) => (
                  <Input {...field} placeholder="کلمه عبور" type="password" />
                )}
              />
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
            </div>

            <button
              type="submit"
              className="bg-primary w-full h-12 rounded-lg text-white"
            >
              ثبت نام
            </button>

            <p className="text-center font-light">
              عضو هستید؟{' '}
              <button
                type="button"
                onClick={onLoginClick}
                className="text-primary hover:underline hover"
              >
                وارد شوید
              </button>
            </p>
          </form>
        </div>
      </div>
    </AuthLayout>
  );
}
