import FieldInput from "@/components/ui/reusable/label-input/field-input";
import { ContractFeatureInput } from "../../../types";
import LabelInput from "@/components/ui/reusable/label-input";

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
      <LabelInput
        labelText="Image"
        inputComponent={<input type="file" id="voucher-image" />}
        inputId="voucher-image"
      />
    </fieldset>
  );
};

VoucherDetails.feature = "voucher";

export default VoucherDetails;
