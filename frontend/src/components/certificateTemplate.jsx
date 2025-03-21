import React from "react";
import { Box, Typography } from "@mui/material";
import Academy from "../assets/academy.svg";
import Operations from "../assets/operations.jpeg";
import Sign from "../assets/sign.jpeg";


const CertificateTemplate = ({ name, course, date,  }) => {
  const commonStyle = {
    width: 65,
    height: 65,
    backgroundColor: "#9C8855",
    borderRadius: "3px",
    position: "absolute",
    top: 0,
    right: 0,
  };
  const rightBack = {
    width: 65,
    height: 65,
    backgroundColor: "#CC6D29",
    borderRadius: "3px",
    position: "absolute",
    top: 0,
    right: 0,
  };
  const rightUpper1 = {
    width: 125,
    height: 125,
    backgroundColor: "#039754",
    borderRadius: "3px",
    position: "absolute",
    top: -15,
    right: -15,
  };
  const rightUpper2 = {
    width: 100,
    height: 100,
    backgroundColor: " #0367ED",
    borderRadius: "3px",
    position: "absolute",
    top: -20,
    right: 60,
  };
  const leftLower1 = {
    width: 125,
    height: 125,
    backgroundColor: "#039754",
    borderRadius: "3px",
    position: "absolute",
    bottom: -10,
    left: -20,
  };
  const leftLower2 = {
    width: 100,
    height: 100,
    backgroundColor: " #0367ED",
    borderRadius: "3px",
    position: "absolute",
    bottom: -25,
    left: 70,
  };
  const leftBack = {
    width: 65,
    height: 65,
    backgroundColor: "#CC6D29",
    borderRadius: "3px",
    position: "absolute",
    top: 0,
    right: 0,
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f3f4f6"
    >
      <Box
        sx={{
          p: 8,
          maxWidth: 1400,
          textAlign: "center",
          backgroundColor: "#FFFFFF",
          boxShadow: 5,
          overflow: "hidden",
          position: "relative",
        }}
      >
        <Box
          sx={{
            mt: -17,
            ml: -17,
            width: 200,
            height: 200,
            backgroundColor: " #0367ED",
            borderRadius: "50%",
            zIndex: 0,
            position: "absolute",
          }}
        />
        <Box
          sx={{
            top: 0,
            right: 0,
            position: "absolute",
            width: 80,
            height: 80,
            zIndex: 2,
          }}
        >
          <Box sx={rightUpper1} />
          <Box sx={{ ...rightUpper1, transform: "rotate(30deg)" }} />
          <Box sx={{ ...rightUpper1, transform: "rotate(60deg)" }} />
        </Box>
        <Box
          sx={{
            top: 0,
            right: 20,
            position: "absolute",
            width: 80,
            height: 80,
            zIndex: 2,
          }}
        >
          <Box sx={rightUpper2} />
          <Box sx={{ ...rightUpper2, transform: "rotate(30deg)" }} />
          <Box sx={{ ...rightUpper2, transform: "rotate(60deg)" }} />
        </Box>
        <Box
          sx={{
            top: 0,
            right: 0,
            position: "absolute",
            width: 80,
            height: 80,
            mt: 20,
            mr: 4,
          }}
        >
          <Box sx={rightBack} />
          <Box sx={{ ...rightBack, transform: "rotate(30deg)" }} />
          <Box sx={{ ...rightBack, transform: "rotate(60deg)" }} />
        </Box>

        <Box
          sx={{
            p: 10,
            pb: 5,
            maxWidth: 800,
            textAlign: "center",
            borderRadius: "16px",
            backgroundColor: "#F6FBFF",
            zIndex: 1,
            position: "relative",
          }}
        >
          <Box display="flex" justifyContent="space-between" px={5}>
            <Box sx={{ fontSize: "18px", mt: -3, ml: -11 }}>
              <Box
                component="img"
                src={Operations}
                alt="Descriptive text"
                sx={{
                  width: 200,
                  height: 60,
                  objectFit: "cover",
                }}
              />
            </Box>
            <Box sx={{ fontSize: "18px", mt: -3, mr: -7}}>
              <Box
                component="img"
                src={Academy}
                alt="Descriptive text"
                sx={{
                  width: 130,
                  height: 55,
                  objectFit: "cover",
                }}
              />
            </Box>
          </Box>
          <Typography
            variant="h3"
            fontWeight="800"
            sx={{ mb: 2, mt: 2 }}
            style={{ color: "#2c3e50" }}
          >
            Certificate Of Participation
          </Typography>
          <Typography
            variant="body1"
            sx={{ fontSize: "20px", mb: 1 }}
            style={{ color: "grey" }}
          >
            This Certificate Is Proudly Presented to
          </Typography>
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ textTransform: "uppercase", mb: 2 }}
            style={{ color: "#2c3e50" }}
          >
            {name}
          </Typography>
          <Typography
            variant="body1"
            sx={{ fontSize: "22px", mt: 1, mb: 2 }}
            style={{ color: "grey" }}
          >
            for his participation in the{" "}
            <span
              style={{ fontWeight: "700", fontSize: "22px", color: "#2c3e50" }}
            >
              {course}
            </span>
          </Typography>

          <Typography
            variant="body1"
            sx={{ fontSize: "22px" }}
            style={{ color: "grey" }}
          >
            Seminar Event
          </Typography>
          <Box mt={10} display="flex" justifyContent="space-between" px={5}>
            <Box>
              <Typography variant="body2" sx={{ fontSize: "16px", mt: 3 }}>
                {date}
              </Typography>
              <Typography
                variant="body2"
                sx={{ fontSize: "16px", mt: 2 }}
                style={{ color: "grey" }}
              >
                Date
              </Typography>
            </Box>
            <Box sx={{ position: "relative", width: 80, height: 80 }}>
              <Box sx={commonStyle} />
              <Box sx={{ ...commonStyle, transform: "rotate(30deg)" }} />
              <Box sx={{ ...commonStyle, transform: "rotate(60deg)" }} />
            </Box>
            <Box>
              <Box
                component="img"
                src={Sign}
                alt="Descriptive text"
                sx={{
                  width: 200,
                  height: 150,
                  objectFit: "cover",
                  marginTop: -7,
                  marginRight: -5,
                }}
              />
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            bottom: 0,
            left: 0,
            position: "absolute",
            width: 80,
            height: 80,
            mb: 20,
            ml: 2,
          }}
        >
          <Box sx={leftBack} />
          <Box sx={{ ...leftBack, transform: "rotate(30deg)" }} />
          <Box sx={{ ...leftBack, transform: "rotate(60deg)" }} />
        </Box>
        <Box
          sx={{
            bottom: 0,
            left: 0,
            position: "absolute",
            width: 80,
            height: 80,
            zIndex: 2,
          }}
        >
          <Box sx={leftLower1} />
          <Box sx={{ ...leftLower1, transform: "rotate(30deg)" }} />
          <Box sx={{ ...leftLower1, transform: "rotate(60deg)" }} />
        </Box>
        <Box
          sx={{
            bottom: 0,
            left: 0,
            position: "absolute",
            width: 80,
            height: 80,
            zIndex: 2,
          }}
        >
          <Box sx={leftLower2} />
          <Box sx={{ ...leftLower2, transform: "rotate(30deg)" }} />
          <Box sx={{ ...leftLower2, transform: "rotate(60deg)" }} />
        </Box>
        <Box
          sx={{
            bottom: 0,
            right: 0,
            mb: -9,
            mr: -9,
            width: 200,
            height: 200,
            backgroundColor: " #0367ED",
            borderRadius: "50%",
            zIndex: 0,
            position: "absolute",
          }}
        />
      </Box>
    </Box>
  );
};

export default CertificateTemplate;
