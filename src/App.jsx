import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Table, Alert, Accordion } from 'react-bootstrap';
import './App.css';
import config from './config.json';

function App() {
  const [loanAmount, setLoanAmount] = useState(300000);
  const [interestRate, setInterestRate] = useState(6.5);
  const [loanTerm, setLoanTerm] = useState(30);
  const [customLoanTerm, setCustomLoanTerm] = useState(false);
  const [downPayment, setDownPayment] = useState(60000);
  const [propertyTax, setPropertyTax] = useState(3000);
  const [homeInsurance, setHomeInsurance] = useState(1200);
  const [pmi, setPmi] = useState(0);
  const [hoaFees, setHoaFees] = useState(0);
  
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [principalAndInterest, setPrincipalAndInterest] = useState(0);
  const [monthlyPropertyTax, setMonthlyPropertyTax] = useState(0);
  const [monthlyInsurance, setMonthlyInsurance] = useState(0);
  const [monthlyPmi, setMonthlyPmi] = useState(0);
  const [monthlyHoa, setMonthlyHoa] = useState(0);

  useEffect(() => {
    calculateMortgage();
  }, [loanAmount, interestRate, loanTerm, downPayment, propertyTax, homeInsurance, pmi, hoaFees, customLoanTerm]);

  const calculateMortgage = () => {
    const principal = loanAmount - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;

    if (principal <= 0 || monthlyRate <= 0 || numberOfPayments <= 0) {
      return;
    }

    // Calculate monthly principal and interest using mortgage formula
    const x = Math.pow(1 + monthlyRate, numberOfPayments);
    const monthlyPI = (principal * x * monthlyRate) / (x - 1);

    // Calculate other monthly costs
    const monthlyTax = propertyTax / 12;
    const monthlyIns = homeInsurance / 12;
    const monthlyPMI = pmi / 12;
    const monthlyHOA = hoaFees / 12;

    // Total monthly payment
    const totalMonthly = monthlyPI + monthlyTax + monthlyIns + monthlyPMI + monthlyHOA;

    // Total payment over life of loan
    const totalPaid = (monthlyPI * numberOfPayments) + (propertyTax * loanTerm) + 
                      (homeInsurance * loanTerm) + (pmi * loanTerm) + (hoaFees * loanTerm);
    
    // Total interest paid
    const totalInt = (monthlyPI * numberOfPayments) - principal;

    setPrincipalAndInterest(monthlyPI);
    setMonthlyPropertyTax(monthlyTax);
    setMonthlyInsurance(monthlyIns);
    setMonthlyPmi(monthlyPMI);
    setMonthlyHoa(monthlyHOA);
    setMonthlyPayment(totalMonthly);
    setTotalPayment(totalPaid);
    setTotalInterest(totalInt);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatCurrencyDecimal = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const homePrice = loanAmount;
  const downPaymentPercent = ((downPayment / homePrice) * 100).toFixed(1);
  const loanToValue = (((homePrice - downPayment) / homePrice) * 100).toFixed(1);

  // Social sharing functions
  const pageUrl = encodeURIComponent(window.location.href);
  const shareTitle = encodeURIComponent('US Mortgage Calculator - Calculate Your Monthly Payments');
  const shareText = encodeURIComponent('Check out this helpful US Mortgage Calculator!');

  const shareOnWhatsApp = () => {
    window.open(`https://wa.me/?text=${shareText}%20${pageUrl}`, '_blank');
  };

  const shareOnTelegram = () => {
    window.open(`https://t.me/share/url?url=${pageUrl}&text=${shareText}`, '_blank');
  };

  const shareOnFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`, '_blank');
  };

  const shareOnTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?url=${pageUrl}&text=${shareText}`, '_blank');
  };

  const shareOnLinkedIn = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${pageUrl}`, '_blank');
  };

  const shareViaEmail = () => {
    window.location.href = `mailto:?subject=${shareTitle}&body=${shareText}%20${pageUrl}`;
  };

  return (
    <div className="App">
      <Container fluid className="py-4 bg-light min-vh-100">
        <Row className="justify-content-center">
          <Col xs={12} className="text-center mb-4">
            <h1 className="display-4 fw-bold text-primary">US Mortgage Calculator</h1>
            <p className="lead text-muted">Calculate your monthly mortgage payments with taxes and insurance</p>
          </Col>
        </Row>

        {/* Social Sharing Section */}
        <Row className="justify-content-center mb-4">
          <Col xs={12} lg={10} xl={8}>
            <Card className="shadow-sm">
              <Card.Body className="text-center py-3">
                <p className="mb-2 fw-semibold text-secondary">Share this calculator:</p>
                <div className="d-flex flex-wrap justify-content-center gap-2">
                  <Button variant="success" size="sm" onClick={shareOnWhatsApp} className="social-btn">
                    <i className="bi bi-whatsapp"></i> WhatsApp
                  </Button>
                  <Button variant="info" size="sm" onClick={shareOnTelegram} className="social-btn">
                    <i className="bi bi-telegram"></i> Telegram
                  </Button>
                  <Button variant="primary" size="sm" onClick={shareOnFacebook} className="social-btn">
                    <i className="bi bi-facebook"></i> Facebook
                  </Button>
                  <Button variant="dark" size="sm" onClick={shareOnTwitter} className="social-btn">
                    <i className="bi bi-twitter-x"></i> Twitter
                  </Button>
                  <Button variant="secondary" size="sm" onClick={shareOnLinkedIn} className="social-btn">
                    <i className="bi bi-linkedin"></i> LinkedIn
                  </Button>
                  <Button variant="danger" size="sm" onClick={shareViaEmail} className="social-btn">
                    <i className="bi bi-envelope"></i> Email
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="justify-content-center">
          {/* Left Vertical Ad Sidebar - Hidden on mobile */}
          {config.features.showAds && config.features.adPlacement.verticalLeftSidebar && (
            <Col xs={12} lg={2} xl={2} className="d-none d-lg-block mb-4">
              <div className="sticky-ad">
                <Card className="shadow-sm ad-container-vertical">
                  <Card.Body className="text-center py-5 bg-light">
                    <p className="text-muted small mb-0" style={{writingMode: 'vertical-rl', transform: 'rotate(180deg)'}}>Advertisement Space</p>
                  </Card.Body>
                </Card>
              </div>
            </Col>
          )}

          {/* Main Content */}
          <Col xs={12} lg={config.features.showAds && config.features.adPlacement.verticalLeftSidebar ? 10 : 12} xl={config.features.showAds && config.features.adPlacement.verticalLeftSidebar ? 8 : 10}>
            <Row className="g-4">
              {/* Input Form */}
              <Col xs={12} md={6}>
                <Card className="shadow-sm h-100">
                  <Card.Header className="bg-primary text-white">
                    <h5 className="mb-0">Loan Details</h5>
                  </Card.Header>
                  <Card.Body>
                    <Form>
                      <Form.Group className="mb-3">
                        <Form.Label>Home Price</Form.Label>
                        <div className="input-group">
                          <span className="input-group-text">$</span>
                          <Form.Control
                            type="number"
                            value={loanAmount}
                            onChange={(e) => setLoanAmount(Number(e.target.value))}
                            min="0"
                          />
                        </div>
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Down Payment</Form.Label>
                        <div className="input-group">
                          <span className="input-group-text">$</span>
                          <Form.Control
                            type="number"
                            value={downPayment}
                            onChange={(e) => setDownPayment(Number(e.target.value))}
                            min="0"
                          />
                        </div>
                        <Form.Text className="text-muted">
                          {downPaymentPercent}% of home price
                        </Form.Text>
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Interest Rate</Form.Label>
                        <div className="input-group">
                          <Form.Control
                            type="number"
                            value={interestRate}
                            onChange={(e) => setInterestRate(Number(e.target.value))}
                            step="0.125"
                            min="0"
                          />
                          <span className="input-group-text">%</span>
                        </div>
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Loan Term</Form.Label>
                        <Form.Select
                          value={customLoanTerm ? 'custom' : loanTerm}
                          onChange={(e) => {
                            const value = e.target.value;
                            if (value === 'custom') {
                              setCustomLoanTerm(true);
                            } else {
                              setCustomLoanTerm(false);
                              setLoanTerm(Number(value));
                            }
                          }}
                        >
                          <option value="15">15 years</option>
                          <option value="20">20 years</option>
                          <option value="30">30 years</option>
                          <option value="custom">Custom</option>
                        </Form.Select>
                      </Form.Group>

                      {customLoanTerm && (
                        <Form.Group className="mb-3">
                          <Form.Label>Custom Loan Term (Years)</Form.Label>
                          <Form.Control
                            type="number"
                            value={loanTerm}
                            onChange={(e) => setLoanTerm(Number(e.target.value))}
                            min="1"
                            max="50"
                            placeholder="Enter years"
                          />
                          <Form.Text className="text-muted">
                            Enter loan term between 1-50 years
                          </Form.Text>
                        </Form.Group>
                      )}

                      <hr />

                      <h6 className="text-secondary mb-3">Additional Costs (Annual)</h6>

                      <Form.Group className="mb-3">
                        <Form.Label>Property Tax (Yearly)</Form.Label>
                        <div className="input-group">
                          <span className="input-group-text">$</span>
                          <Form.Control
                            type="number"
                            value={propertyTax}
                            onChange={(e) => setPropertyTax(Number(e.target.value))}
                            min="0"
                          />
                        </div>
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Home Insurance (Yearly)</Form.Label>
                        <div className="input-group">
                          <span className="input-group-text">$</span>
                          <Form.Control
                            type="number"
                            value={homeInsurance}
                            onChange={(e) => setHomeInsurance(Number(e.target.value))}
                            min="0"
                          />
                        </div>
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>PMI (Yearly)</Form.Label>
                        <div className="input-group">
                          <span className="input-group-text">$</span>
                          <Form.Control
                            type="number"
                            value={pmi}
                            onChange={(e) => setPmi(Number(e.target.value))}
                            min="0"
                          />
                        </div>
                        <Form.Text className="text-muted">
                          Usually required if down payment is less than 20%
                        </Form.Text>
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>HOA Fees (Yearly)</Form.Label>
                        <div className="input-group">
                          <span className="input-group-text">$</span>
                          <Form.Control
                            type="number"
                            value={hoaFees}
                            onChange={(e) => setHoaFees(Number(e.target.value))}
                            min="0"
                          />
                        </div>
                      </Form.Group>
                    </Form>
                  </Card.Body>
                </Card>
              </Col>

              {/* Results */}
              <Col xs={12} md={6}>
                <Card className="shadow-sm mb-4">
                  <Card.Header className="bg-success text-white">
                    <h5 className="mb-0">Monthly Payment</h5>
                  </Card.Header>
                  <Card.Body className="text-center">
                    <h2 className="display-3 fw-bold text-success mb-0">
                      {formatCurrencyDecimal(monthlyPayment)}
                    </h2>
                    <p className="text-muted">per month</p>
                  </Card.Body>
                </Card>

                <Card className="shadow-sm mb-4">
                  <Card.Header className="bg-info text-white">
                    <h6 className="mb-0">Payment Breakdown</h6>
                  </Card.Header>
                  <Card.Body>
                    <Table striped bordered hover responsive size="sm">
                      <tbody>
                        <tr>
                          <td>Principal & Interest</td>
                          <td className="text-end fw-bold">{formatCurrencyDecimal(principalAndInterest)}</td>
                        </tr>
                        <tr>
                          <td>Property Tax</td>
                          <td className="text-end">{formatCurrencyDecimal(monthlyPropertyTax)}</td>
                        </tr>
                        <tr>
                          <td>Home Insurance</td>
                          <td className="text-end">{formatCurrencyDecimal(monthlyInsurance)}</td>
                        </tr>
                        {monthlyPmi > 0 && (
                          <tr>
                            <td>PMI</td>
                            <td className="text-end">{formatCurrencyDecimal(monthlyPmi)}</td>
                          </tr>
                        )}
                        {monthlyHoa > 0 && (
                          <tr>
                            <td>HOA Fees</td>
                            <td className="text-end">{formatCurrencyDecimal(monthlyHoa)}</td>
                          </tr>
                        )}
                        <tr className="table-success">
                          <td className="fw-bold">Total Monthly</td>
                          <td className="text-end fw-bold">{formatCurrencyDecimal(monthlyPayment)}</td>
                        </tr>
                      </tbody>
                    </Table>
                  </Card.Body>
                </Card>

                <Card className="shadow-sm">
                  <Card.Header className="bg-warning">
                    <h6 className="mb-0">Loan Summary</h6>
                  </Card.Header>
                  <Card.Body>
                    <Table striped bordered hover responsive size="sm">
                      <tbody>
                        <tr>
                          <td>Home Price</td>
                          <td className="text-end">{formatCurrency(homePrice)}</td>
                        </tr>
                        <tr>
                          <td>Down Payment</td>
                          <td className="text-end">{formatCurrency(downPayment)} ({downPaymentPercent}%)</td>
                        </tr>
                        <tr>
                          <td>Loan Amount</td>
                          <td className="text-end fw-bold">{formatCurrency(homePrice - downPayment)}</td>
                        </tr>
                        <tr>
                          <td>Loan-to-Value (LTV)</td>
                          <td className="text-end">{loanToValue}%</td>
                        </tr>
                        <tr>
                          <td>Total Interest Paid</td>
                          <td className="text-end text-danger fw-bold">{formatCurrency(totalInterest)}</td>
                        </tr>
                        <tr className="table-warning">
                          <td className="fw-bold">Total Cost ({loanTerm} years)</td>
                          <td className="text-end fw-bold">{formatCurrency(totalPayment)}</td>
                        </tr>
                      </tbody>
                    </Table>
                  </Card.Body>
                </Card>

                {loanToValue > 80 && pmi === 0 && (
                  <Alert variant="warning" className="mt-3">
                    <Alert.Heading className="h6">PMI Notice</Alert.Heading>
                    Your down payment is less than 20%. You may need to pay Private Mortgage Insurance (PMI).
                  </Alert>
                )}
              </Col>
            </Row>
          </Col>
        </Row>

        <Row className="justify-content-center mt-4">
          <Col xs={12} lg={10} xl={8}>
            <Card className="shadow-sm">
              <Card.Body className="text-center text-muted small">
                <p className="mb-1">
                  <strong>Note:</strong> This calculator provides an estimate. Actual mortgage payments may vary based on 
                  your lender, credit score, and other factors.
                </p>
                <p className="mb-0">
                  US Mortgage rates are typically fixed or adjustable (ARM). This calculator assumes a fixed-rate mortgage.
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* YouTube Help Video Section */}
        <Row className="justify-content-center mt-4">
          <Col xs={12} lg={10} xl={8}>
            <Card className="shadow-sm">
              <Card.Header className="bg-danger text-white">
                <h5 className="mb-0">
                  <i className="bi bi-youtube"></i> Video Tutorial: How to Use This Calculator
                </h5>
              </Card.Header>
              <Card.Body>
                <div className="ratio ratio-16x9">
                  <iframe
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                    title="Mortgage Calculator Tutorial"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="rounded"
                  ></iframe>
                </div>
                <p className="text-muted small mt-3 mb-0">
                  Watch this helpful tutorial to learn how to calculate your mortgage payments accurately.
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* FAQ Section */}
        <Row className="justify-content-center mt-4">
          <Col xs={12} lg={10} xl={8}>
            <Card className="shadow-sm">
              <Card.Header className="bg-primary text-white">
                <h5 className="mb-0">
                  <i className="bi bi-question-circle"></i> Frequently Asked Questions (FAQs)
                </h5>
              </Card.Header>
              <Card.Body>
                <Accordion>
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>What is a mortgage calculator?</Accordion.Header>
                    <Accordion.Body>
                      A mortgage calculator is a tool that helps you estimate your monthly mortgage payments based on the home price, 
                      down payment, interest rate, loan term, and additional costs like property taxes, insurance, and HOA fees.
                    </Accordion.Body>
                  </Accordion.Item>

                  <Accordion.Item eventKey="1">
                    <Accordion.Header>How is the monthly payment calculated?</Accordion.Header>
                    <Accordion.Body>
                      The monthly payment includes Principal & Interest (calculated using the mortgage formula), plus monthly portions 
                      of property tax, home insurance, PMI (if applicable), and HOA fees. The formula is: M = P[r(1+r)^n]/[(1+r)^n-1], 
                      where M is monthly payment, P is principal, r is monthly interest rate, and n is number of payments.
                    </Accordion.Body>
                  </Accordion.Item>

                  <Accordion.Item eventKey="2">
                    <Accordion.Header>What is PMI and when do I need it?</Accordion.Header>
                    <Accordion.Body>
                      PMI (Private Mortgage Insurance) is typically required when your down payment is less than 20% of the home price. 
                      It protects the lender if you default on the loan. Once you build 20% equity in your home, you can usually request 
                      to have PMI removed. PMI costs typically range from 0.5% to 1% of the loan amount annually.
                    </Accordion.Body>
                  </Accordion.Item>

                  <Accordion.Item eventKey="3">
                    <Accordion.Header>What's the difference between fixed and adjustable rate mortgages?</Accordion.Header>
                    <Accordion.Body>
                      A fixed-rate mortgage has an interest rate that stays the same throughout the loan term, providing predictable payments. 
                      An adjustable-rate mortgage (ARM) has an interest rate that can change periodically based on market conditions, usually 
                      starting with a lower rate but potentially increasing over time. This calculator assumes a fixed-rate mortgage.
                    </Accordion.Body>
                  </Accordion.Item>

                  <Accordion.Item eventKey="4">
                    <Accordion.Header>Should I choose a 15-year or 30-year mortgage?</Accordion.Header>
                    <Accordion.Body>
                      A 15-year mortgage has higher monthly payments but you'll pay significantly less interest over the life of the loan 
                      and build equity faster. A 30-year mortgage has lower monthly payments, making it more affordable month-to-month, 
                      but you'll pay more interest overall. Choose based on your financial situation, income stability, and long-term goals.
                    </Accordion.Body>
                  </Accordion.Item>

                  <Accordion.Item eventKey="5">
                    <Accordion.Header>How much should I put down as a down payment?</Accordion.Header>
                    <Accordion.Body>
                      While the traditional recommendation is 20% to avoid PMI, many buyers put down less. FHA loans require as little as 
                      3.5% down, and conventional loans can go as low as 3%. A larger down payment reduces your loan amount, monthly payment, 
                      and total interest paid. However, make sure to keep enough savings for emergencies and closing costs.
                    </Accordion.Body>
                  </Accordion.Item>

                  <Accordion.Item eventKey="6">
                    <Accordion.Header>What other costs should I consider when buying a home?</Accordion.Header>
                    <Accordion.Body>
                      Beyond the mortgage payment, consider: closing costs (2-5% of home price), property taxes, homeowners insurance, 
                      HOA fees (if applicable), maintenance and repairs (1-2% of home value annually), utilities, and potential PMI. 
                      It's recommended to have 3-6 months of expenses saved as an emergency fund.
                    </Accordion.Body>
                  </Accordion.Item>

                  <Accordion.Item eventKey="7">
                    <Accordion.Header>Can I pay off my mortgage early?</Accordion.Header>
                    <Accordion.Body>
                      Most mortgages allow early payoff without penalties, but some have prepayment penalties—check your loan terms. 
                      Making extra principal payments can save thousands in interest and help you pay off your mortgage years earlier. 
                      Even small additional payments can make a significant difference over time.
                    </Accordion.Body>
                  </Accordion.Item>

                  <Accordion.Item eventKey="8">
                    <Accordion.Header>How accurate is this calculator?</Accordion.Header>
                    <Accordion.Body>
                      This calculator provides a close estimate of your mortgage payments using standard formulas. However, actual payments 
                      may vary based on your specific lender, credit score, loan type, additional fees, and local taxes. Always consult with 
                      a mortgage lender or financial advisor for precise figures tailored to your situation.
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
