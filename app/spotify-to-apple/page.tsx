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
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const SpotifyToApple = () => {
  const [isLoading, setIsLoading] = useState(false); // Track loading state
  const [trackInfo, setTrackInfo] = useState("");
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
      const trackInfo = {
        trackName: response.data.trackName,
        trackArtist: response.data.trackArtist,
        trackAlbum: response.data.trackAlbum,
      };
      // Implement what to do with the response apple music link
      console.log(response.data);
      setTrackInfo(
        `Track Name: ${trackInfo.trackName}\nArtist: ${trackInfo.trackArtist}\nAlbum: ${trackInfo.trackAlbum}`
      );
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
        <div className="flex flex-col w-full space-y-2">
          <Label htmlFor="message">Debug Window</Label>
          <Textarea placeholder={trackInfo} id="message" />
        </div>
      </form>
    </Form>
  );
};

export default SpotifyToApple;
