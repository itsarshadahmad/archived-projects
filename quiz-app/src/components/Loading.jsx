import React from "react";

export default function Loading() {
  return (
    <>
      <div class="spinner">
        <div class="loader l1"></div>
        <div class="loader l2"></div>
      </div>
      <h1 className="loading">Loading...</h1>
    </>
  );
}
