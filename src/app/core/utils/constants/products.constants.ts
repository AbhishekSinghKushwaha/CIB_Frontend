import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ProductsConstants {
  constructor() { }

  PRODUCT_CATEGORIES = [
    {
      id: "payment",
      title: "Payment",
      subtitle: "Secondary line",
      icon: "user_profile",
      children: [{
        id: "payment.internal.fund",
        title: "Internal Fund Transfer",
        subtitle: "Secondary line",
        icon: "",
      }, {
        id: "payment.internal.fund2",
        title: "Internal Fund Transfer",
        subtitle: "Secondary line",
        icon: "",
      }, {
        id: "payment.internal.fund3",
        title: "Internal Fund Transfer",
        subtitle: "Secondary line",
        icon: "",
      },]
    },
    {
      id: "loans",
      title: "Loans",
      subtitle: "Secondary line",
      icon: "user_profile",
      children: []
    },
    {
      id: "agents",
      title: "Agents",
      subtitle: "Secondary line",
      icon: "user_profile",
      children: []
    },
    {
      id: "merchants",
      title: "Merchants",
      subtitle: "Secondary line",
      icon: "user_profile",
      children: []
    },
    {
      id: "core.account",
      title: "Core accouint services",
      subtitle: "Secondary line",
      icon: "user_profile",
      children: []
    },
    {
      id: "host.2.host",
      title: "Host to host",
      subtitle: "Secondary line",
      icon: "user_profile",
      children: []
    }
  ]

}
