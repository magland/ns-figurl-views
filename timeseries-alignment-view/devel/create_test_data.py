import kachery_cloud as kcl


data = {
    'items': [
        {
            'path': '/test/path1',
            'neurodataType': 'timeseries',
            'startTime': 0,
            'endTime': 100,
            'color': 'red'
        },
        {
            'path': '/test/path2',
            'neurodataType': 'timeseries',
            'startTime': 40,
            'endTime': 140,
            'color': 'blue'
        }
    ]
}
uri = kcl.store_json(data, label='test1.json')
print(uri)
print('')
print(f'https://figurl.org/f?v=http://localhost:5173&d={uri}')
print('')
print(f'https://figurl.org/f?v=https://tempory.net/ns-figurl-views/timeseries-alignment-view&d={uri}')
print('')

