import React, { useEffect, useState } from "react";
import { EyeOutlined } from "@ant-design/icons";
import { Image } from "antd";

function TableImageCell(props) {
  const { value, row, setIsTableChange } = props;
  const [visible, setVisible] = useState(false);

  const [imageUrl, setImageUrl] = useState();
  const [imagePdfUrl, setImagePdfUrl] = useState();

  const showImage = (url) => {
    if (url) {
      const lastDotIndex = url.lastIndexOf(".");
      const result = url.substring(lastDotIndex + 1);
      if (result === 'pdf') {
        setImagePdfUrl(url)
      } else {
        setImageUrl(url)
      }
    }
  }

  useEffect(() => {
    const url = row?.analyzesContentUrl
    showImage(url)
  }, [row?.analyzesContentUrl])

  if (!value) {
    return ''
  }

  return (
    <div style={{ display: "flex" }}>

      <div
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setVisible(true);
          setIsTableChange((prev) => !prev);
        }}
        style={{ marginRight: "10px", color: "blue", cursor: "pointer" }}
      >
        <EyeOutlined />
      </div>

      <div>{value}</div>

      {
        imageUrl ? (
          <Image
            width={200}
            style={{
              display: "none",
            }}
            src={imageUrl}
            preview={{
              visible,
              scaleStep: 0.5,
              src: imageUrl,
              onVisibleChange: (value) => {
                setVisible(value);
              },
            }}
          />
        ) : ''}

    </div>
  );
}

export default TableImageCell;
