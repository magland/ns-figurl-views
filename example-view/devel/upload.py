import os
import time
import boto3


with open('package.json') as f:
    package_json = f.read()
    view_name = package_json.split('"name": "')[1].split('"')[0]


def main():
    os.system("yarn build")
    upload_dir(f"https://tempory.net/ns-figurl-views/{view_name}", "dist")


def upload_dir(url: str, dirname: str):
    print(f'Uploading directory: {dirname} to {url}')
    for root, dirs, files in os.walk(dirname):
        for fname in files:
            full_path = os.path.join(root, fname)
            rel_path = os.path.relpath(full_path, dirname)
            object_key = f"{url}/{rel_path}"
            upload_file(object_key, full_path)


def upload_file(url: str, filename: str):
    print(f"Uploading file: {filename} to {url}")
    if not url.startswith(f"https://tempory.net/ns-figurl-views/{view_name}/"):
        raise ValueError(f"Invalid URL for uploading text file: {url}")
    s3 = boto3.client(
        "s3",
        aws_access_key_id=os.environ["AWS_ACCESS_KEY_ID"],
        aws_secret_access_key=os.environ["AWS_SECRET_ACCESS_KEY"],
        endpoint_url=os.environ["S3_ENDPOINT_URL"],
        region_name="auto",  # for cloudflare
    )
    bucket = "tempory"
    object_key = url[len("https://tempory.net/"):]
    _upload_file_to_s3(s3, bucket, object_key, filename)


def _upload_file_to_s3(s3, bucket, object_key, fname):
    if fname.endswith(".html"):
        content_type = "text/html"
    elif fname.endswith(".js"):
        content_type = "application/javascript"
    elif fname.endswith(".css"):
        content_type = "text/css"
    elif fname.endswith(".png"):
        content_type = "image/png"
    elif fname.endswith(".jpg"):
        content_type = "image/jpeg"
    elif fname.endswith(".svg"):
        content_type = "image/svg+xml"
    elif fname.endswith(".json"):
        content_type = "application/json"
    elif fname.endswith(".gz"):
        content_type = "application/gzip"
    else:
        content_type = None
    extra_args = {}
    if content_type is not None:
        extra_args["ContentType"] = content_type
    num_retries = 3
    while True:
        try:
            s3.upload_file(fname, bucket, object_key, ExtraArgs=extra_args)
            break
        except Exception as e:
            print(f"Error uploading {object_key} to S3: {e}")
            time.sleep(3)
            num_retries -= 1
            if num_retries == 0:
                raise


if __name__ == "__main__":
    main()
