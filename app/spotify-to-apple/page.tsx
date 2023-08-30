"use client";
import React, { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Song } from "../../components/songDetails/columns";
import { v4 as uuidv4 } from "uuid";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import SongDetailsTable from "../../components/songDetails/page";

const SpotifyToApple = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [trackDetails, setTrackDetails] = useState<Song[]>([]);
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
    const serverUrl = "https://music-con-server.vercel.app/get-song";
    setIsLoading(true);
    try {
      const response = await axios.get(serverUrl, {
        params: {
          url: encodedTrackURL,
        },
      });

      const trackDetails: Song[] = [
        {
          id: uuidv4(),
          trackName: response.data.trackName,
          trackArtist: response.data.trackArtist,
          trackURL: response.data.appleMusicLink,
        },
      ];
      setTrackDetails(trackDetails);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex w-full items-center space-x-2">
          <FormField
            control={form.control}
            name="URL"
            render={({ field }) => (
              <FormItem className="flex-grow">
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
        </div>
        <SongDetailsTable data={trackDetails} />
      </form>
    </Form>
  );
};

export default SpotifyToApple;
