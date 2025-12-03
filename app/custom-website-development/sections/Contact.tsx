'use client';
import { toast } from 'sonner';
import { sendEmail } from "@/actions/sendEmail";
import AnimateIn from "@/components/AnimateIn";
import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Minus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";

type FormValues = {
  name: string;
  phone: string;
  email: string;
  message: string;
};

export default function Contact() {
  const form = useForm<FormValues>({
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    const emailContent = `
      Name: ${values.name}
      Phone: ${values.phone}
      Email: ${values.email}
      Message: ${values.message}
    `;

    try {
      await sendEmail(emailContent);
      alert("Your message has been sent successfully!");
      form.reset();
    } catch (error) {
      console.error("Error sending email", error);
      alert("There was an error sending your message. Please try again.");
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${text} copied to clipboard`);
  };

  return (
    <section className="flex flex-col items-center py-20 rounded-3xl px-3" id="contact">
      <AnimateIn y={100} className="w-full flex flex-col md:flex-row justify-center items-center gap-3">
        <Container className="bg-[white] max-w-full">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col w-[400px] max-w-full px-2 py-5 rounded-md gap-4 ">
              <h2 className='text-center !text-2xl'>Contact Us and Get <br />Your Custom Website</h2>

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input autoComplete="true" placeholder="Your name" {...field} className="text-sm" required/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input autoComplete="true" placeholder="Phone number" {...field} className="text-sm" required/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input autoComplete="true" type="email" placeholder="Email" {...field} className="text-sm"  required/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea placeholder="Message" {...field} className="text-sm" required/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="self-end">
                Send Message
              </Button>
            </form>
          </Form>
        </Container>

        <div className="flex flex-col md:flex-row justify-center gap-1 my-5">
          <Minus className="rotate-90 md:rotate-0"/>
          <p>OR</p>
          <Minus className="rotate-90 md:rotate-0"/>
        </div>

        <Container className="flex gap-5 p-5 bg-[white]">
          <Link href={"https://wa.me/201221112378?text=Hi%20Etavelle%2C%20I%E2%80%99m%20interested%20in%20your%20web%20services"} target="_blank" className="flex items-center cursor-pointer">
            <Image
              alt="WhatsApp icon"
              src={'/icons/logos/whatsapp.svg'}
              width={0}
              height={0}
              className="w-10 h-10 mr-3"
            />
          </Link>
          <Link href={'https://www.linkedin.com/in/misha-zaafarani'} target="_blank" className="flex items-center cursor-pointer">
            <Image
              alt="LinkedIn icon"
              src={'/icons/logos/linkedin.svg'}
              width={0}
              height={0}
              className="w-10 h-10 mr-3"
            />
          </Link>
          <div className="flex items-center cursor-pointer" onClick={() => copyToClipboard("misha@etavelle.com")}>
            <Image
              alt="Email icon"
              src={'/icons/logos/email.svg'}
              width={0}
              height={0}
              className="w-10 h-10 mr-3"
            />
          </div>
          <div className="flex items-center cursor-pointer" onClick={() => copyToClipboard("+201221112378")}>
            <Image
              alt="Phone icon"
              src={'/icons/logos/phone.svg'}
              width={0}
              height={0}
              className="w-10 h-10 mr-3"
            />
          </div>
        </Container>
      </AnimateIn>
    </section>
  );
}