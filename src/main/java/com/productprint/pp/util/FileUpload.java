package com.productprint.pp.util;

import java.awt.Graphics2D;
import java.awt.Image;
import java.awt.RenderingHints;
import java.awt.image.BufferedImage;
import java.io.BufferedInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;

import javax.imageio.ImageIO;
import javax.imageio.ImageWriter;
import javax.imageio.stream.ImageOutputStream;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;

//import org.apache.myfaces.custom.fileupload.UploadedFile;

//import com.sun.image.codec.jpeg.JPEGCodec;
//import com.sun.image.codec.jpeg.JPEGImageEncoder;

public class FileUpload {
	public static final String OUTPUT_DIR = "output";
	public static final String FILEUPLOAD_DIR = "fileupload";
	public static final String IMAGE_FILEUPLOAD_DIR = "profileiamgeupload";
	public final static String jpeg = "jpeg";
	public final static String jpg = "jpg";
	public final static String gif = "gif";
	public final static String tiff = "tiff";
	public final static String tif = "tif";
	public final static String png = "png";

	public static String getFilePath(ServletContext context, String dir) {

		File file = new File(context.getRealPath("") + File.separator + "WEB-INF");
		File uploaded;
		while (file != null) {
			if (file.exists() && file.isDirectory()) {
				uploaded = new File(file.getAbsolutePath() + File.separator + dir);
				if (uploaded.exists() && uploaded.isDirectory()) {
					try {
						return uploaded.getCanonicalPath();
					} catch (java.io.IOException e) {
						return uploaded.getAbsolutePath();
					}
				}
			}
			file = file.getParentFile();
		}
		return null;
	}

	/**
	 * 
	 * @category - resize image to JPEG with specific width & height
	 * @param p_image - input stream
	 * @param pImageData - image in Byte[]
	 * @param pMaxWidth - width you wish to resize to
	 * @param pMaxHeight - height you wish to resize to
	 * @return byte[]
	 */
	public byte[] resizeImageAsJPG(InputStream p_image, byte[] pImageData, String imgExtension, int pMaxWidth, int pMaxHeight) throws IOException {
		InputStream imageStream = new BufferedInputStream(p_image);
	    Image imageIcon = (Image) ImageIO.read(imageStream); 
	    
		int width = imageIcon.getWidth(null);
		int height = imageIcon.getHeight(null);
		
		// Create an ImageIcon from the image data
//		ImageIcon imageIcon = new ImageIcon(pImageData);
//		int width = imageIcon.getIconWidth();
//		int height = imageIcon.getIconHeight();
		boolean isTIFF = verifyExtension(imgExtension);
		
		if(width > pMaxWidth || height > pMaxHeight || isTIFF) {
			// If the image is larger than the max width, we need to resize it
			if(width == height) {
				// Determine the shrink ratio
			    double ratio = (double) pMaxWidth / width;
			    height = (int) (height * ratio);
			    width = pMaxWidth;
			} else if(width > height) {
				double ratio = (double) pMaxWidth / width;
				height = (int) (height * ratio);
				width = pMaxWidth;
			} else if(height > width){
				double ratio = (double) pMaxHeight / height;
				height = pMaxHeight;
				width = (int) (width * ratio);
			} else{}
			
			// Create a new empty image buffer to "draw" the resized image into
			BufferedImage bufferedResizedImage = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);
			// Create a Graphics object to do the "drawing"
			Graphics2D g2d = bufferedResizedImage.createGraphics();
			g2d.setRenderingHint(RenderingHints.KEY_INTERPOLATION, RenderingHints.VALUE_INTERPOLATION_BICUBIC);
			// Draw the resized image
			g2d.drawImage(imageIcon, 0, 0, width, height, null);
			g2d.dispose();
			// Now our buffered image is ready
			// Encode it as a JPEG
			ByteArrayOutputStream encoderOutputStream = new ByteArrayOutputStream();
			
			// OLD JPEG CLASS
			//JPEGImageEncoder encoder = JPEGCodec.createJPEGEncoder(encoderOutputStream);
			//encoder.encode(bufferedResizedImage);
			
			/** NEW JPEG ENCODER **/
			// Image writer
		    //JPEGImageWriter imageWriter = (JPEGImageWriter) ImageIO.getImageWritersBySuffix("jpeg").next();
		    ImageWriter  imageWriter = ImageIO.getImageWritersBySuffix("jpg").next();
		    ImageOutputStream ios = ImageIO.createImageOutputStream(encoderOutputStream);
		    imageWriter.setOutput(ios);
		    
		    //new Write and clean up
		    //imageWriter.write(imageMetaData, new IIOImage(image_to_save, null, null), null);
		    imageWriter.write(bufferedResizedImage);
		    ios.close();
		    imageWriter.dispose();
		    /** NEW JPEG ENCODER END **/
			
			byte[] resizedImageByteArray = encoderOutputStream.toByteArray();
			return resizedImageByteArray;
		}
		return pImageData;
	}
	
	private boolean verifyExtension(String extension){
		if(extension.equalsIgnoreCase(tif))
			return true;
		if(extension.equalsIgnoreCase(tiff))
			return true;
		return false;
	}

	/*
	 * Get the extension of a file.
	 */
	public static String getExtension(File f) {
		String s = f.getName();
		return getExtension(s);
	}

	public static String getExtension(String filename) {
		String ext = null;
		String s = filename;
		int i = s.lastIndexOf('.');

		if (i > 0 && i < s.length() - 1) {
			ext = s.substring(i + 1).toLowerCase();
		}
		return ext;
	}
}
