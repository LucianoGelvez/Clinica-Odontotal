package JuniorsDH.Odontotal.Service;

import JuniorsDH.Odontotal.Security.AwsConfig;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.UUID;

@Service
public class ImagesS3Service {
    private final static String BUCKET = "odontotal-images";

    private final AwsConfig config = new AwsConfig();

    private final AmazonS3Client s3Client = (AmazonS3Client) config.getS3Client();

    public String uploadSingleFile(MultipartFile imageFile) {
        String extension = StringUtils.getFilenameExtension(imageFile.getOriginalFilename());
        String key = String.format("%s.%s%", UUID.randomUUID(), extension);
        ObjectMetadata objectMetadata = new ObjectMetadata();
        objectMetadata.setContentType(imageFile.getContentType());

        try {
            PutObjectRequest putObjectRequest = new PutObjectRequest(BUCKET, key, imageFile.getInputStream(), objectMetadata);
            s3Client.putObject(putObjectRequest);
            return getObjectUrl(key);
        } catch (IOException e) {
            throw new RuntimeException("Error al cargar el archivo en Amazon S3: " +  e.getMessage());
        }
    }
    public String getObjectUrl(String key){
        return String.format("https://%s.s3.amazonaws.com/%s",BUCKET,key);
    }

    public void deleteObject(String key){
        s3Client.deleteObject(BUCKET,key);
    }

}
