import FieldInput from "@/components/ui/reusable/label-input/field-input";
import { ContractFeatureInput } from "../../../types";

const VoucherDetails: ContractFeatureInput<"voucher"> = ({
  setDetails,
  initialDetails,
  setValidity,
}) => {
  return (
    <fieldset>
      <h2>Voucher Details</h2>
      <FieldInput
        labelText="Name"
        id="voucher-name"
        value={initialDetails?.name}
        onChange={(value) => {
          setDetails("name", value);
        }}
      />
    </fieldset>
  );
};

VoucherDetails.feature = "voucher";
