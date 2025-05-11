"use client";

import { OpenAPIV1 } from "@/app/contract";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";

export default function OpenApiDocsPage() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full px-8">
      <SwaggerUI spec={OpenAPIV1} displayOperationId displayRequestDuration />
    </div>
  );
}
