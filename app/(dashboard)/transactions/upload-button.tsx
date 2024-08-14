import { Upload } from "lucide-react";
import { useCSVReader } from "react-papaparse";

import { Button } from "@/components/ui/button";

type Props = {
  onUpload: (results: any) => void;
};

export const UploadButton = ({ onUpload }: Props) => {
  const { CSVReader } = useCSVReader();
  // TODO: add a paywall

  return (
    <CSVReader onUploadAccepted={onUpload}>
      {({ getRootProps }: any) => (
        <Button
          size={"sm"}
          variant="outline"
          className="w-full lg:w-auto"
          {...getRootProps()}
        >
          <Upload className="mr-2 size-4" />
          Import file csv
        </Button>
      )}
    </CSVReader>
  );
};
