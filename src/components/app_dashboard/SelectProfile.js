import { Select, Box, Text } from "grommet";
import { memo } from "react";
import { Add, FormClose } from "grommet-icons";

const SelectProfile = ({
  options,
  selectedId,
  onOptionSelected,
  onCreateSelected,
  onDeleteSelected,
}) => {
  return (
    <Select
      options={[
        ...options,
        {
          label: "Create http profile",
          id: "create",
        },
      ]}
      labelKey="label"
      name="Select Profile"
      valueKey={{ key: "id", reduce: true }}
      onChange={({ value: id }) => {
        if (id === "create") {
          onCreateSelected();
        } else {
          onOptionSelected(id);
        }
      }}
      value={selectedId}
    >
      {(option, index) => (
        <Option
          value={option}
          selected={option.id === selectedId}
          onDeleteClick={onDeleteSelected}
        />
      )}
    </Select>
  );
};

const Option = memo(({ value, selected, onDeleteClick }) => (
  <Box
    direction="row"
    gap="small"
    align="start"
    pad="small"
    fill="horizontal"
    background={selected ? { color: "brand" } : ""}
  >
    {value.id === "create" && <Add color="accent-1" />}
    <Box flex="grow" align="start">
      <Text truncate>{value.label}</Text>
    </Box>
    {value.id !== "create" && (
      <FormClose
        size="medium"
        onClick={(e) => {
          e.stopPropagation();
          onDeleteClick(value.id);
        }}
      />
    )}
  </Box>
));

export default SelectProfile;
