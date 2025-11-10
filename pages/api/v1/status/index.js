function status(request, response) {
  response.status(200).json({ status: "Everything OK" });
}

export default status;
