import FirestoreCollectionPaths from './FirestoreCollectionPaths'

interface CustomDocumentReference<T>
  extends firebase.firestore.DocumentReference<T> {
  update(data: Partial<Omit<T, 'id'>>): Promise<void>
  update(
    field: Extract<keyof Omit<T, 'id'>, string>,
    value: Pick<T, typeof field>
  ): Promise<void>
}

interface CustomCollectionReference<T>
  extends firebase.firestore.CollectionReference<T> {
  doc(docId: string): CustomDocumentReference<T>
  add(data: Omit<T, 'id'>): Promise<CustomDocumentReference<T>>
  where(
    fieldPath: Extract<keyof T, string>,
    opStr: firebase.firestore.WhereFilterOp,
    value: any
  ): firebase.firestore.Query<T>
}

interface CustomFirestore extends firebase.firestore.Firestore {
  collection<T extends keyof FirestoreCollectionPaths>(
    collectionPath: T
  ): CustomCollectionReference<FirestoreCollectionPaths[T]>
}

export default CustomFirestore
