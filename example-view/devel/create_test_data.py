import kachery_cloud as kcl


data = {
    'a': 1
}
uri = kcl.store_json(data, label='test1.json')
print(uri)
