"use client";

import { useState, useEffect } from "react";
import { ShoppingBag, ChevronDown, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { LoaderComponent } from "@/components/LoaderComponent";

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  _id: string;
  items: OrderItem[];
  kitchenNotes: string;
  discount: number;
  tax: number;
  serviceCharge: number;
  subtotal: number;
  total: number;
  status: string;
  createdAt: string;
}

const statusColors: Record<string, string> = {
  pending: "bg-amber-600",
  confirmed: "bg-blue-600",
  preparing: "bg-purple-600",
  completed: "bg-emerald-600",
  cancelled: "bg-red-600",
};

function OrderCard({ order }: { order: Order }) {
  const [expanded, setExpanded] = useState(false);

  const date = new Date(order.createdAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const handleDownload = () => {
    window.open(`/api/user/orders/download?orderId=${order._id}`, "_blank");
  };

  return (
    <div className="rounded-2xl bg-burgundy-800 overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex flex-row items-center justify-between w-full p-5 hover:bg-burgundy-700/30 transition-colors"
      >
        <div className="flex flex-row items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-burgundy-700 flex items-center justify-center shrink-0">
            <ShoppingBag size={18} className="text-white-60" />
          </div>
          <div className="flex flex-col items-start gap-1">
            <p className="font-bold text-sm text-white">
              {order.items.length} item{order.items.length !== 1 ? "s" : ""}
            </p>
            <p className="text-xxs text-white-60">{date}</p>
          </div>
        </div>
        <div className="flex flex-row items-center gap-3">
          <Badge
            className={cn(
              "text-white text-[10px]",
              statusColors[order.status] || "bg-burgundy-700",
            )}
          >
            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
          </Badge>
          <p className="font-bold text-sm text-primary">
            R{order.total.toFixed(2)}
          </p>
          <ChevronDown
            size={16}
            className={cn(
              "text-white-60 transition-transform",
              expanded && "rotate-180",
            )}
          />
        </div>
      </button>

      {expanded && (
        <div className="px-5 pb-5 flex flex-col gap-3">
          <Separator className="bg-burgundy-700" />
          {order.items.map((item, i) => (
            <div key={i} className="flex flex-row justify-between">
              <div className="flex flex-row gap-2">
                <span className="text-xs text-white-60">{item.quantity}×</span>
                <span className="text-xs text-white">{item.name}</span>
              </div>
              <span className="text-xs text-white-60">
                R{(item.price * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}
          <Separator className="bg-burgundy-700" />
          <div className="flex flex-col gap-1">
            <div className="flex justify-between text-xxs text-white-60">
              <span>Subtotal</span>
              <span>R{order.subtotal.toFixed(2)}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-xxs text-emerald-400">
                <span>Discount</span>
                <span>-R{order.discount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between text-xxs text-white-60">
              <span>Tax</span>
              <span>R{order.tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xxs text-white-60">
              <span>Service Charge</span>
              <span>R{order.serviceCharge.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm font-bold text-white mt-1">
              <span>Total</span>
              <span className="text-primary">R{order.total.toFixed(2)}</span>
            </div>
          </div>
          {order.kitchenNotes && (
            <div className="p-3 rounded-xl bg-burgundy-900/60 border border-burgundy-700">
              <p className="text-xxs text-white-60 uppercase font-semibold mb-1">
                Kitchen Notes
              </p>
              <p className="text-xs text-white-60">{order.kitchenNotes}</p>
            </div>
          )}
          <Button
            variant="outline"
            size="sm"
            className="border-burgundy-700 text-white self-end gap-2"
            onClick={handleDownload}
          >
            <Download size={14} />
            <span>Download Receipt</span>
          </Button>
        </div>
      )}
    </div>
  );
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("/api/user/orders");
        if (!res.ok) throw new Error("Failed");
        const data = await res.json();
        setOrders(data.orders || []);
      } catch {
        // silent fail
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const handleDownloadAll = () => {
    const params = statusFilter !== "all" ? `?status=${statusFilter}` : "";
    window.open(`/api/user/orders/download${params}`, "_blank");
  };

  const filteredOrders =
    statusFilter === "all"
      ? orders
      : orders.filter((o) => o.status === statusFilter);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <LoaderComponent />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="font-extrabold text-2xl lg:text-3xl text-white">
          Order History
        </h1>
        <p className="text-sm text-white-60">
          View and download your past orders.
        </p>
      </div>

      {orders.length > 0 && (
        <div className="flex flex-row items-center gap-3 flex-wrap">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-burgundy-800 border border-burgundy-700 text-white text-sm rounded-xl px-3 py-2 outline-none"
          >
            <option value="all">All Orders</option>
            <option value="confirmed">Confirmed</option>
            <option value="preparing">Preparing</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>

          <Button
            variant="outline"
            size="sm"
            className="border-burgundy-700 text-white gap-2 ml-auto"
            onClick={handleDownloadAll}
          >
            <Download size={14} />
            <span>
              Download {statusFilter === "all" ? "All" : statusFilter} Orders
            </span>
          </Button>
        </div>
      )}

      {filteredOrders.length > 0 ? (
        <div className="flex flex-col gap-4">
          {filteredOrders.map((order) => (
            <OrderCard key={order._id} order={order} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 gap-3 rounded-2xl bg-burgundy-800">
          <ShoppingBag size={40} className="text-white-60" />
          <p className="text-lg text-white-60">No orders yet</p>
          <p className="text-xs text-white-60">
            Your order history will appear here after your first purchase.
          </p>
        </div>
      )}
    </div>
  );
}
