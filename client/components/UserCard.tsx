import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User } from "@/types/types";

type Props = {
  customer: User;
};

export default function UserCard({ customer }: Props) {
  return (
    <Card className="transition">
      <CardHeader className="space-y-1">
        <h3 className="font-semibold text-lg">{customer.name}</h3>
        <p className="text-sm text-muted-foreground">{customer.email}</p>
      </CardHeader>

      <CardContent className="space-y-2 text-sm">
        {customer.addressLine1 && <p> {customer.addressLine1}</p>}
        {(customer.city || customer.country) && (
          <p className="text-muted-foreground">
            {customer.city}, {customer.country}
          </p>
        )}

        <Badge variant="secondary">Customer</Badge>
      </CardContent>
    </Card>
  );
}
