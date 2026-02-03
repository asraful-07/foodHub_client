"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function Request() {
  const [requested, setRequested] = useState(false);

  const handleRequest = () => {
    toast.success("Request sent to Admin");
    setRequested(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50 p-4">
      <Card className="max-w-md w-full shadow-lg border-orange-200 hover:shadow-xl transition-transform hover:-translate-y-2">
        <CardHeader className="bg-orange-100 border-b border-orange-200">
          <CardTitle className="text-xl font-bold text-orange-800 text-center">
            Customer Request
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 flex flex-col items-center">
          <p className="text-gray-700 text-center mb-4">
            This customer wants to become a Provider. Admin can approve this
            request.
          </p>
          <Button
            className={`w-full ${requested ? "bg-gray-400 cursor-not-allowed" : "bg-orange-600 hover:bg-orange-700"} text-white`}
            onClick={handleRequest}
            disabled={requested}
          >
            {requested ? "Request Sent" : "Send Request"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
