package JuniorsDH.Odontotal.Security;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AwsConfig {

    private String AWS_ACCESS_KEY_ID = "access-key";

    private String AWS_SECRET_ACCESS_KEY="secret-key";

    private String AWS_REGION = "us-east-2";

    @Bean
    @Autowired
    public AmazonS3 getS3Client(){
        BasicAWSCredentials credentials = new BasicAWSCredentials(AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY);
        return AmazonS3ClientBuilder.standard().withRegion(Regions.fromName(AWS_REGION)).withCredentials(new AWSStaticCredentialsProvider(credentials)).build();
    }

}
