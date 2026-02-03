const NEXT_PUBLIC_API_URL = "https://foodhunt-eight.vercel.app";

export const ordersService = {
  getOrders: async function () {
    try {
      const res = await fetch(`${NEXT_PUBLIC_API_URL}/api/order`);
      const data = await res.json();
      return { data, error: null };
    } catch (error) {
      return { data: null, error: "Something went wrong" };
    }
  },

  // GET SINGLE GADGET
  getSingleGadget: async function (id: string) {
    try {
      const res = await fetch(`${NEXT_PUBLIC_API_URL}/api/order/${id}`);
      const data = await res.json();
      return { data, error: null };
    } catch (error) {
      return { data: null, error: "Something went wrong" };
    }
  },

  // CREATE GADGET (POST)
  createGadget: async function (payload: any) {
    try {
      const res = await fetch(`${NEXT_PUBLIC_API_URL}/api/order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      return { data, error: null };
    } catch (error) {
      return { data: null, error: "Failed to create gadget" };
    }
  },

  // UPDATE GADGET (PUT)
  updateGadget: async function (id: string, payload: any) {
    try {
      const res = await fetch(`${NEXT_PUBLIC_API_URL}/api/order/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      return { data, error: null };
    } catch (error) {
      return { data: null, error: "Failed to update gadget" };
    }
  },

  // 🔹 DELETE GADGET
  deleteGadget: async function (id: string) {
    try {
      const res = await fetch(`${NEXT_PUBLIC_API_URL}/api/order/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      return { data, error: null };
    } catch (error) {
      return { data: null, error: "Failed to delete gadget" };
    }
  },
};
