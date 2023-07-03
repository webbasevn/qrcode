import { LoadingButton } from "@mui/lab";
import { Container, Stack, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import Head from "next/head";
import React, { useState } from "react";
import QRCode from "react-qr-code";
import * as yup from 'yup'

const formSchema = yup.object({
  url: yup
      .string()
      .required('Nhập url vào ông nội'),
})

export default function Home() {

  const [loading,setLoading] = useState(false)
  const [value,setValue] = useState("https://pinggo.vn")

  const formik = useFormik({
    initialValues: {
      url: value
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      setLoading(true)
      setValue(values.url)
      setLoading(false)
    }
  })

  return (
    <>
      <Head>
        <title>Hệ thống tạo mã QRcode</title>
      </Head>

      <Container maxWidth="xs">
        <form onSubmit={formik.handleSubmit}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" mt={3}>
            <TextField
              id="url"
              name="url"
              label="Nhập tên miền"
              variant="outlined"
              size="small"
              value={formik.values.url}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.url && Boolean(formik.errors.url)}
              helperText={formik.touched.url && formik.errors.url}
            />
            <LoadingButton
              variant="contained"
              loading={loading}
              type="submit"
            >
              Tạo mã
            </LoadingButton>
          </Stack>
        </form>

        <Stack direction="row" justifyContent="center" alignItems="center" mt={3}>

          <QRCode
            size={256}
            value={value}
            viewBox={`0 0 256 256`}
          />
        </Stack>

        <Typography variant="body2" textAlign="center" mt={3} fontWeight={700}>Kết quả mã QRCODE với url là {value}</Typography>

      </Container>
    </>
  )
}
