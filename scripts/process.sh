#!/bin/bash

# Define output CSV file and image folder
output_file="image_data.csv"
image_folder="./medium"

# Write CSV header
echo "Filename,Date/Time,Latitude,Longitude,DominantColor,AverageColor,Orientation" > "$output_file"

# Loop through images in the folder
for image in "$image_folder"/*.{jpg,jpeg,png}; do
  # Skip if no matching files
  [ -e "$image" ] || continue

  # Get filename
  filename=$(basename "$image")

  # Extract EXIF data
  datetime=$(exiftool -d "%Y-%m-%d %H:%M:%S" -DateTimeOriginal -s3 "$image")
  lat=$(exiftool -n -GPSLatitude -s3 "$image")
  lon=$(exiftool -n -GPSLongitude -s3 "$image")

  # Default values if EXIF data is missing
  datetime=${datetime:-"N/A"}
  lat=${lat:-"N/A"}
  lon=${lon:-"N/A"}

  # Extract dominant and average color
  dominant_color=$(convert "$image" -resize 100x100 -define histogram:unique-colors=true -format %c histogram:info:- | sort -nr | head -1 | grep -oE "#[A-Fa-f0-9]{6}")  
  average_color=$(convert "$image" -scale 1x1! -format "%[hex:p{0,0}]" info:- | sed 's/^/#/')
  

  # Default values if colors are missing
  dominant_color=${dominant_color:-"N/A"}
  average_color=${average_color:-"N/A"}

  # Get image dimensions and determine orientation
  dimensions=$(identify -format "%wx%h" "$image")
  width=$(echo "$dimensions" | cut -d'x' -f1)
  height=$(echo "$dimensions" | cut -d'x' -f2)

  if (( width > height )); then
    orientation="Landscape"
  else
    orientation="Portrait"
  fi

  # Write data to CSV
  echo "$filename,$datetime,$lat,$lon,$dominant_color,$average_color,$orientation" >> "$output_file"
done

# Notify user of completion
echo "CSV generated: $output_file"
