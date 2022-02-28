export interface ProductCategory {
    id: string;
    title: string;
    subtitle: string;
    icon: string;
    children?: ProductCategory[];
  };
  