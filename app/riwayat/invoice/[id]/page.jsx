import InvoiceComponent from "@/app/components/card/Invoice";
import { getInvoice } from "@/app/services/transaksi";

export default async function InvoiceUserPage(props) {
  const { params } = props;
  const invoiceData = await getInvoice(params.id);

  return (
    <div className="max-w-5xl mx-auto p-8 bg-white shadow-md rounded-lg">
      {invoiceData && invoiceData.data ? (
        <InvoiceComponent invoiceData={invoiceData.data} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
