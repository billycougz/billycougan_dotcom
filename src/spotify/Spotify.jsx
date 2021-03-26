import React from "react";
import PDF from "./Spotify.pdf";

function Spotify() {
  return (
    <iframe src={PDF} height="100%" width="100%" scrolling="auto"></iframe>
  );
}

export default Spotify;
