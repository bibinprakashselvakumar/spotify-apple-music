"use client";
import React, { useState } from "react";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";

const SpotifyToApple = () => {
  const [isLoading, setIsLoading] = useState(false); // Track loading state
  const formSchema = z.object({
    URL: z.string().url({ message: "Please enter a valid URL." }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      URL: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const encodedTrackURL = encodeURI(values.URL);
    const serverUrl = "http://localhost:3001/get-song";
    setIsLoading(true); // Set loading to true when the request starts
    try {
      const response = await axios.get(serverUrl, {
        params: {
          url: encodedTrackURL,
        },
      });
      // Implement what to do with the response apple music link
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false); // Set loading to false when the request completes
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="URL"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter a valid spotify music URL"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </>
          ) : (
            "Find Song"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default SpotifyToApple;
