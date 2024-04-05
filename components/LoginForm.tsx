"use client";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  email: z.string().min(2).max(50),
  password: z.string().min(10),
});

const LoginForm = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const postData = async (userData: {
    email: string;
    password: string;
  }) => {
    console.log(userData);

    const postResponse = await fetch(
      "https://api.management.parse25proje.link/api/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      }
    );
    return postResponse.json();
  };

  async function onSubmit(userData: z.infer<typeof formSchema>) {
    console.log(userData);
    try {
      const loginResponse = await postData(userData);
      // console.log(loginResponse);
      // console.log(loginResponse.status);

      if (loginResponse.status) {
        const token = loginResponse.data.token;
        // console.log(token);
        localStorage.setItem("token", token);
        // console.log(localStorage.getItem("token"));
        setTimeout(() => router.push("/dashboard"), 2000);
      }

      // redirect("/dashboard");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="container m-auto flex flex-col space-y-8 rounded-xl border-2 border-slate-400 p-12 lg:p-24 xl:w-1/3"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-mail address</FormLabel>
              <FormControl>
                <Input placeholder="user@kargakarga.com" {...field} />
              </FormControl>
              <FormDescription>
                Make sure to enter the e-mail address that you
                registered with.
              </FormDescription>
              <FormMessage>{}</FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  // placeholder="********"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Your super secret password :-)
              </FormDescription>
              <FormMessage>{}</FormMessage>
            </FormItem>
          )}
        />
        <Button type="submit" className="text-slate-400">
          Submit
        </Button>
      </form>
    </Form>
  );
};
export default LoginForm;
