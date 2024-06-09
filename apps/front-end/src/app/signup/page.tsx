'use client';

import { ISignUpEmployeeFormParams } from '@/@types/ISignUpEmployeeFormParams';
import { Input } from '@/components';
import MemoLogo from '@/components/Logo';
import { useSignUpAPI } from '@/state/useSignUpAPI';
import { useSignUpEmployeeAPI } from '@/state/useSignUpEmployeeAPI';
import { Alert, Button, CircularProgress, Snackbar } from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

export default function SignUpPage() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const isIntranet = process.env.NEXT_PUBLIC_IS_INTRANET_MODE === 'true';

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<ISignUpEmployeeFormParams>();

  const { mutateAsync: signUpUser, isPending: isUserSignUpPending } =
    useSignUpAPI();
  const { mutateAsync: signUpEmployee, isPending: isEmployeeSignUpPending } =
    useSignUpEmployeeAPI();
  const isPending = isEmployeeSignUpPending || isUserSignUpPending;

  const onSubmit = async (variables: ISignUpEmployeeFormParams) => {
    try {
      const { data } = isIntranet
        ? await signUpEmployee(variables)
        : await signUpUser(variables);

      localStorage.setItem('jwtToken', data.access_token);
      router.replace('/');
    } catch (e: any) {
      setErrorMessage(e?.response?.data?.message);
      setOpen(true);
      console.error(e);
    }
  };

  const onLoginClick = () => {
    router.push('/login');
  };

  const handleClose = (_?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <div className="flex mx-auto h-screen">
      <div className="hidden md:flex flex-col w-1/2 bg-primary px-20 py-40 bg-[linear-gradient(to_left,#32B7C5,rgba(0,0,0,0)),url('/login-bg.png')] bg-cover">
        <div className="flex items-center gap-x-2">
          <MemoLogo fontSize={120} />
          <h1 className="text-white">من قرآن می‌خوانم</h1>
        </div>
        <p className="mt-auto text-white">
          تولید شده در معاونت تربیت و آموزش سا.ع.س فراجا
        </p>
      </div>

      <div className="w-96 p-4 mx-auto my-auto flex flex-col">
        <div className="space-y-4">
          <h2 className="font-bold">ثبت نام</h2>

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
              {errors.name && (
                <p className="text-red-500">{errors.name.message}</p>
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
              {errors.lastName && (
                <p className="text-red-500">{errors.lastName.message}</p>
              )}
            </div>
            <div>
              <Controller
                name="username"
                control={control}
                rules={{
                  required: isIntranet
                    ? 'شماره پرسنلی الزامی است'
                    : 'شماره تلفن همراه الزامی است',
                }}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder={
                      isIntranet ? 'شماره پرسنلی' : 'شماره تلفن همراه'
                    }
                  />
                )}
              />
              {errors.username && (
                <p className="text-red-500">{errors.username.message}</p>
              )}
            </div>

            <div>
              <Controller
                name="nationalCode"
                control={control}
                rules={{ required: 'کد ملی الزامی است.' }}
                render={({ field }) => (
                  <Input {...field} type="number" placeholder="کد ملی" />
                )}
              />
              {errors.nationalCode && (
                <p className="text-red-500">{errors.nationalCode.message}</p>
              )}
            </div>

            {isIntranet && (
              <div>
                <Controller
                  name="rank"
                  control={control}
                  rules={{ required: 'درجه الزامی است' }}
                  render={({ field }) => (
                    <Input {...field} placeholder="درجه" />
                  )}
                />
                {errors.rank && (
                  <p className="text-red-500">{errors.rank.message}</p>
                )}
              </div>
            )}
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
            <Button
              type="submit"
              className="bg-primary w-full h-12 rounded-lg text-white"
              disabled={isPending}
            >
              {isPending ? (
                <CircularProgress sx={{ color: 'white' }} />
              ) : (
                'ثبت نام'
              )}
            </Button>
            <p className="text-center font-light">
              عضو هستید؟{' '}
              <Button
                disabled={isPending}
                type="button"
                onClick={onLoginClick}
                className="text-primary hover:underline hover"
              >
                وارد شوید
              </Button>
            </p>
          </form>
        </div>
      </div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          {errorMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
