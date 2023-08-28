"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const NavBar = () => {
  return (
    <div className="flex container w-full justify-center sticky border-b-2">
      <div className="p-5">
        <Button asChild>
          <Link href="/spotify-to-apple"> Spotify to Apple Music</Link>
        </Button>
      </div>
      <div className="p-5">
        <Button asChild>
          <Link href="/apple-to-spotify">Apple Music to Spotify</Link>
        </Button>
      </div>
    </div>
  );
};

export default NavBar;
