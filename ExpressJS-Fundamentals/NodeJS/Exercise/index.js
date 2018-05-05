let storage = require('./db/storage')

storage.put('first','firstValue')
storage.put('second','secondValue')
storage.put('third','thirdValue')
storage.put('fouth','fourthValue')
storage.get('first', (res) => writeResult(res))
storage.getAll((res) => writeResult(res))
storage.deleteItem('second')
storage.update('first','updatedFirst')
storage.save()
storage.clear()
storage.getAll((res) => writeResult(res))
storage.load().then(() => {
    storage.getAll((res) => writeResult(res))
})

function writeResult(res){
    console.log(res)
}