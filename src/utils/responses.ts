import { NextResponse } from "next/server";

class Response {
  message?: string;
  error?: string;
  status?: number;

  constructor(
    message?: string,
    error?: string,
    status?: number
  ) {
    this.message = message ?? "";
    this.error = error ?? "";
    this.status = status ?? 500;
  }

  errorRes() {
    return NextResponse.json({
      message: this.message,
      error: this.error
    }, {
      status: this.status
    })
  }

  badRequest() {
    return NextResponse.json({
      message: "Required fields",
      error: "Bad request"
    }, {
      status: 403
    });
  };

  serverError() {
    return NextResponse.json({
      message: this.message,
      error: this.error
    }, {
      status: 500
    })
  };

  created(data: any) {
    return NextResponse.json({
      message: this.message,
      error: this.error,
      data
    }, {
      status: 201
    })
  };

  notProvided() {
    return NextResponse.json({
      message: "Not provided credentials",
      error: "Not provided",
    }, {
      status: 402
    })
  }

  notFound() {
    return NextResponse.json({
      message: this.message,
      error: this.error
    }, {
      status: 404
    })
  }

  ok(data: any) {
    return NextResponse.json({
      message: this.message,
      data
    }, {
      status: 200
    })
  }
}

export default Response;