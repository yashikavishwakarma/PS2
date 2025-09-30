import QRCodeDisplay from "../QRCodeDisplay";

export default function QRCodeDisplayExample() {
  const measurementUrl = `${window.location.origin}/measurement/abc123`;
  
  return (
    <div className="p-6 flex justify-center">
      <QRCodeDisplay measurementId="abc123" value={measurementUrl} />
    </div>
  );
}
