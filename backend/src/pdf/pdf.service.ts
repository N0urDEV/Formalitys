import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';
import * as path from 'path';

@Injectable()
export class PdfService {
  async generateCompanyDossierPdf(dossierData: any): Promise<Uint8Array> {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    try {
      const page = await browser.newPage();
      
      // Generate HTML content for company dossier
      const htmlContent = this.generateCompanyDossierHtml(dossierData);
      
      await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
      
      const pdf = await page.pdf({
        format: 'A4',
        printBackground: true,
        margin: {
          top: '20mm',
          right: '15mm',
          bottom: '20mm',
          left: '15mm'
        }
      });

      return pdf;
    } finally {
      await browser.close();
    }
  }

  async generateTourismDossierPdf(dossierData: any): Promise<Uint8Array> {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    try {
      const page = await browser.newPage();
      
      // Generate HTML content for tourism dossier
      const htmlContent = this.generateTourismDossierHtml(dossierData);
      
      await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
      
      const pdf = await page.pdf({
        format: 'A4',
        printBackground: true,
        margin: {
          top: '20mm',
          right: '15mm',
          bottom: '20mm',
          left: '15mm'
        }
      });

      return pdf;
    } finally {
      await browser.close();
    }
  }

  private generateCompanyDossierHtml(dossierData: any): string {
    const { user, dossier } = dossierData;
    const associates = dossier.associates || [];
    const activities = dossier.activities || [];
    const uploadedFiles = dossier.uploadedFiles || [];
    
    // Debug logging
    console.log('PDF Generation - Dossier data:', JSON.stringify(dossier, null, 2));
    console.log('PDF Generation - Uploaded files:', JSON.stringify(uploadedFiles, null, 2));

    return `
      <!DOCTYPE html>
      <html lang="fr">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Dossier de Création de Société</title>
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            font-family: 'Arial', sans-serif;
            line-height: 1.4;
            color: #000;
            background: #fff;
            font-size: 12px;
          }
          
          .header {
            border-bottom: 2px solid #000;
            padding: 20px 0;
            margin-bottom: 20px;
            text-align: center;
          }
          
          .header h1 {
            font-size: 24px;
            margin-bottom: 5px;
            font-weight: bold;
            color: #000;
          }
          
          .header p {
            font-size: 12px;
            color: #666;
          }
          
          .content {
            padding: 0 20px;
          }
          
          .section {
            margin-bottom: 20px;
            page-break-inside: avoid;
          }
          
          .section-title {
            background: #f5f5f5;
            border: 1px solid #000;
            padding: 8px 12px;
            font-size: 14px;
            font-weight: bold;
            margin-bottom: 10px;
            text-transform: uppercase;
          }
          
          .info-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
            margin-bottom: 15px;
          }
          
          .info-item {
            border: 1px solid #ddd;
            padding: 10px;
            background: #fff;
          }
          
          .info-label {
            font-weight: bold;
            margin-bottom: 4px;
            font-size: 11px;
            text-transform: uppercase;
            color: #333;
          }
          
          .info-value {
            color: #000;
            font-size: 12px;
          }
          
          .associates-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
            border: 1px solid #000;
          }
          
          .associates-table th,
          .associates-table td {
            border: 1px solid #000;
            padding: 8px;
            text-align: left;
            font-size: 11px;
          }
          
          .associates-table th {
            background: #f0f0f0;
            font-weight: bold;
            text-transform: uppercase;
          }
          
          .associates-table tr:nth-child(even) {
            background: #f9f9f9;
          }
          
          .activities-list {
            list-style: none;
            padding: 0;
          }
          
          .activities-list li {
            border: 1px solid #ddd;
            padding: 8px 12px;
            margin-bottom: 5px;
            background: #fff;
            font-size: 11px;
          }
          
          .files-list {
            list-style: none;
            padding: 0;
          }
          
          .files-list li {
            border: 1px solid #ddd;
            padding: 8px 12px;
            margin-bottom: 5px;
            background: #fff;
            font-size: 11px;
          }
          
          .footer {
            margin-top: 30px;
            padding: 15px;
            border-top: 2px solid #000;
            text-align: center;
            font-size: 10px;
            color: #666;
          }
          
          .status-badge {
            display: inline-block;
            padding: 4px 8px;
            border: 1px solid #000;
            font-weight: bold;
            font-size: 10px;
            text-transform: uppercase;
            background: #fff;
          }
          
          .status-draft { background: #fff; }
          .status-paid { background: #f0f0f0; }
          .status-completed { background: #e0e0e0; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Dossier de Création de Société</h1>
          <p>Généré le ${new Date().toLocaleDateString('fr-FR')} - Formalitys</p>
        </div>
        
        <div class="content">
          <!-- Informations générales -->
          <div class="section">
            <div class="section-title">Informations Générales du Dossier</div>
            <div class="info-grid">
              <div class="info-item">
                <div class="info-label">Statut du dossier</div>
                <div class="info-value">
                  <span class="status-badge status-${dossier.status?.toLowerCase()}">${dossier.status || 'DRAFT'}</span>
                </div>
              </div>
              <div class="info-item">
                <div class="info-label">Étape actuelle</div>
                <div class="info-value">${dossier.currentStep || 1} / 5</div>
              </div>
              <div class="info-item">
                <div class="info-label">Date de création</div>
                <div class="info-value">${new Date(dossier.createdAt).toLocaleDateString('fr-FR')}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Dernière mise à jour</div>
                <div class="info-value">${new Date(dossier.updatedAt).toLocaleDateString('fr-FR')}</div>
              </div>
            </div>
          </div>

          <!-- Informations utilisateur -->
          <div class="section">
            <div class="section-title">Informations du Demandeur</div>
            <div class="info-grid">
              <div class="info-item">
                <div class="info-label">Nom complet</div>
                <div class="info-value">${user.name || 'Non renseigné'}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Email</div>
                <div class="info-value">${user.email || 'Non renseigné'}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Téléphone</div>
                <div class="info-value">${user.phone || 'Non renseigné'}</div>
              </div>
            </div>
          </div>

          <!-- Informations des associés -->
          <div class="section">
            <div class="section-title">Informations des Associés</div>
            ${associates.length > 0 ? `
            <table class="associates-table">
              <thead>
                <tr>
                  <th>Nom</th>
                  <th>Prénom</th>
                  <th>Type de pièce</th>
                  <th>Numéro</th>
                  <th>Genre</th>
                  <th>Nationalité</th>
                  <th>Adresse</th>
                  <th>Téléphone</th>
                  <th>Email</th>
                  <th>Rôle</th>
                </tr>
              </thead>
              <tbody>
                ${associates.map(associate => `
                  <tr>
                    <td>${associate.nom || 'Non renseigné'}</td>
                    <td>${associate.prenom || 'Non renseigné'}</td>
                    <td>${associate.typePiece || 'Non renseigné'}</td>
                    <td>${associate.numero || 'Non renseigné'}</td>
                    <td>${associate.genre || 'Non renseigné'}</td>
                    <td>${associate.nationalite || 'Non renseigné'}</td>
                    <td>${associate.adresse || 'Non renseigné'}</td>
                    <td>${associate.telephone || 'Non renseigné'}</td>
                    <td>${associate.email || 'Non renseigné'}</td>
                    <td>${associate.isGerant ? 'Gérant' : 'Associé'}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
            ` : '<p>Aucun associé renseigné</p>'}
          </div>

          <!-- Activités -->
          <div class="section">
            <div class="section-title">Activités Sélectionnées</div>
            <ul class="activities-list">
              ${activities.length > 0 ? activities.map(activity => `<li>${activity}</li>`).join('') : '<li>Aucune activité sélectionnée</li>'}
            </ul>
          </div>

          <!-- Informations de la société -->
          <div class="section">
            <div class="section-title">Informations de la Société</div>
            <div class="info-grid">
              <div class="info-item">
                <div class="info-label">Nom de la société</div>
                <div class="info-value">${dossier.companyName || 'Non renseigné'}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Raison sociale</div>
                <div class="info-value">${dossier.raisonSociale || 'Non renseigné'}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Forme juridique</div>
                <div class="info-value">${dossier.formeJuridique || 'Non renseigné'}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Nationalité</div>
                <div class="info-value">${dossier.nationalite || 'Non renseigné'}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Noms proposés</div>
                <div class="info-value">${dossier.proposedNames?.join(', ') || 'Non renseigné'}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Siège social</div>
                <div class="info-value">${dossier.headquarters || 'Non renseigné'}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Capital social</div>
                <div class="info-value">${dossier.capital ? dossier.capital.toLocaleString('fr-FR') + ' MAD' : 'Non renseigné'}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Banque choisie</div>
                <div class="info-value">${dossier.selectedBank || 'Non renseigné'}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Adresse du siège social</div>
                <div class="info-value">${dossier.adresseSiege || 'Non renseigné'}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Ville du siège social</div>
                <div class="info-value">${dossier.villeSiege || 'Non renseigné'}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Profession ou activité principale</div>
                <div class="info-value">${dossier.professionActivite || 'Non renseigné'}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Téléphone de la société</div>
                <div class="info-value">${dossier.telephone || 'Non renseigné'}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Fax</div>
                <div class="info-value">${dossier.fax || 'Non renseigné'}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Email de la société</div>
                <div class="info-value">${dossier.email || 'Non renseigné'}</div>
              </div>
            </div>
          </div>

          <!-- Informations fiscales et administratives -->
          <div class="section">
            <div class="section-title">Informations Fiscales et Administratives</div>
            <div class="info-grid">
              <div class="info-item">
                <div class="info-label">N° Article Taxe professionnelle</div>
                <div class="info-value">${dossier.numeroArticleTaxeProfessionnelle || 'Non renseigné'}</div>
              </div>
              <div class="info-item">
                <div class="info-label">N° Article Taxe de Services Communaux</div>
                <div class="info-value">${dossier.numeroArticleTaxeServicesCommunaux || 'Non renseigné'}</div>
              </div>
              <div class="info-item">
                <div class="info-label">N° affiliation CNSS</div>
                <div class="info-value">${dossier.numeroAffiliationCNSS || 'Non renseigné'}</div>
              </div>
              <div class="info-item">
                <div class="info-label">N° Registre de Commerce</div>
                <div class="info-value">${dossier.numeroRegistreCommerce || 'Non renseigné'}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Ville du registre de commerce</div>
                <div class="info-value">${dossier.villeRegistreCommerce || 'Non renseigné'}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Références de dépôt de la déclaration</div>
                <div class="info-value">${dossier.referenceDepotDeclaration || 'Non renseigné'}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Date de dépôt de la déclaration</div>
                <div class="info-value">${dossier.dateDepotDeclaration || 'Non renseigné'}</div>
              </div>
            </div>
          </div>

          <!-- Documents uploadés -->
          <div class="section">
            <div class="section-title">Documents Uploadés</div>
            <ul class="files-list">
              ${uploadedFiles.length > 0 ? uploadedFiles.map(file => {
                const displayName = file.documentType ? 
                  `${file.uploadedByName || 'Utilisateur'} - ${file.documentType.toUpperCase()}` : 
                  (file.originalname || file.filename);
                return `<li>${displayName}</li>`;
              }).join('') : '<li>Aucun document uploadé</li>'}
            </ul>
          </div>

          <!-- Paiement -->
          <div class="section">
            <div class="section-title">Informations de Paiement</div>
            <div class="info-grid">
              <div class="info-item">
                <div class="info-label">Statut du paiement</div>
                <div class="info-value">${dossier.paymentStatus || 'Non payé'}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Montant payé</div>
                <div class="info-value">${dossier.amountPaid ? (dossier.amountPaid / 100).toLocaleString('fr-FR') + ' MAD' : 'Non payé'}</div>
              </div>
            </div>
          </div>
        </div>

        <div class="footer">
          <p><strong>Formalitys</strong> - Création de société en ligne au Maroc</p>
          <p>Ce document a été généré automatiquement le ${new Date().toLocaleString('fr-FR')}</p>
          <p>Pour toute question, contactez-nous à support@formalitys.ma</p>
        </div>
      </body>
      </html>
    `;
  }

  private generateTourismDossierHtml(dossierData: any): string {
    const { user, dossier } = dossierData;
    const ownerInfo = dossier.ownerInfo || {};
    const establishmentInfo = dossier.establishmentInfo || {};
    const complianceAnswers = dossier.complianceAnswers || {};
    const uploadedFiles = dossier.uploadedFiles || [];
    const uploadedPhotos = dossier.uploadedPhotos || [];

    return `
      <!DOCTYPE html>
      <html lang="fr">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Dossier de Régularisation Location Touristique</title>
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            font-family: 'Times New Roman', serif;
            line-height: 1.4;
            color: #000;
            background: #fff;
            font-size: 12px;
          }
          
          .header {
            border-bottom: 3px solid #000;
            padding: 20px 0;
            margin-bottom: 30px;
            text-align: center;
          }
          
          .header h1 {
            font-size: 24px;
            margin-bottom: 8px;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 1px;
          }
          
          .header p {
            font-size: 14px;
            color: #666;
          }
          
          .content {
            padding: 0 20px;
          }
          
          .section {
            margin-bottom: 25px;
            page-break-inside: avoid;
          }
          
          .section-title {
            background: #f5f5f5;
            border: 1px solid #000;
            padding: 8px 12px;
            font-size: 14px;
            font-weight: bold;
            margin-bottom: 12px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          
          .info-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
            margin-bottom: 15px;
          }
          
          .info-item {
            border: 1px solid #ddd;
            padding: 10px;
            background: #fff;
          }
          
          .info-label {
            font-weight: bold;
            margin-bottom: 4px;
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 0.3px;
          }
          
          .info-value {
            color: #000;
            font-size: 12px;
          }
          
          .questionnaire-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
            border: 1px solid #000;
          }
          
          .questionnaire-table th,
          .questionnaire-table td {
            border: 1px solid #000;
            padding: 8px;
            text-align: left;
            font-size: 11px;
          }
          
          .questionnaire-table th {
            background: #f0f0f0;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 0.3px;
          }
          
          .questionnaire-table tr:nth-child(even) {
            background: #f9f9f9;
          }
          
          .files-list {
            list-style: none;
            padding: 0;
          }
          
          .files-list li {
            border: 1px solid #ddd;
            padding: 8px 12px;
            margin-bottom: 5px;
            background: #fff;
            font-size: 11px;
          }
          
          .footer {
            margin-top: 40px;
            padding: 15px;
            border-top: 2px solid #000;
            text-align: center;
            font-size: 10px;
            color: #666;
          }
          
          .status-badge {
            display: inline-block;
            padding: 4px 8px;
            border: 1px solid #000;
            font-weight: bold;
            font-size: 10px;
            text-transform: uppercase;
            background: #fff;
          }
          
          .status-draft { background: #fff; }
          .status-paid { background: #f0f0f0; }
          .status-completed { background: #e0e0e0; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Dossier de Régularisation Location Touristique</h1>
          <p>Généré le ${new Date().toLocaleDateString('fr-FR')} - Formalitys</p>
        </div>
        
        <div class="content">
          <!-- Informations générales -->
          <div class="section">
            <div class="section-title">Informations Générales</div>
            <div class="info-grid">
              <div class="info-item">
                <div class="info-label">Statut du dossier</div>
                <div class="info-value">
                  <span class="status-badge status-${dossier.status?.toLowerCase()}">${dossier.status || 'DRAFT'}</span>
                </div>
              </div>
              <div class="info-item">
                <div class="info-label">Étape actuelle</div>
                <div class="info-value">${dossier.currentStep || 1} / 6</div>
              </div>
              <div class="info-item">
                <div class="info-label">Date de création</div>
                <div class="info-value">${new Date(dossier.createdAt).toLocaleDateString('fr-FR')}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Dernière mise à jour</div>
                <div class="info-value">${new Date(dossier.updatedAt).toLocaleDateString('fr-FR')}</div>
              </div>
            </div>
          </div>

          <!-- Informations utilisateur -->
          <div class="section">
            <div class="section-title">Informations du Demandeur</div>
            <div class="info-grid">
              <div class="info-item">
                <div class="info-label">Nom complet</div>
                <div class="info-value">${user.name}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Email</div>
                <div class="info-value">${user.email}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Téléphone</div>
                <div class="info-value">${user.phone || 'Non renseigné'}</div>
              </div>
            </div>
          </div>

          <!-- Informations du propriétaire -->
          <div class="section">
            <div class="section-title">Informations du Propriétaire</div>
            <div class="info-grid">
              <div class="info-item">
                <div class="info-label">Nom</div>
                <div class="info-value">${ownerInfo.nom || 'Non renseigné'}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Prénom</div>
                <div class="info-value">${ownerInfo.prenom || 'Non renseigné'}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Type de pièce</div>
                <div class="info-value">${ownerInfo.typePiece || 'Non renseigné'}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Numéro de pièce</div>
                <div class="info-value">${ownerInfo.numero || 'Non renseigné'}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Téléphone</div>
                <div class="info-value">${ownerInfo.telephone || 'Non renseigné'}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Email</div>
                <div class="info-value">${ownerInfo.email || 'Non renseigné'}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Adresse</div>
                <div class="info-value">${ownerInfo.adresse || 'Non renseigné'}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Qualité</div>
                <div class="info-value">${ownerInfo.qualite || 'Non renseigné'}</div>
              </div>
            </div>
          </div>

          <!-- Informations de l'établissement -->
          <div class="section">
            <div class="section-title">Informations de l'Établissement</div>
            <div class="info-grid">
              <div class="info-item">
                <div class="info-label">Type d'établissement</div>
                <div class="info-value">${establishmentInfo.type || 'Non renseigné'}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Catégorie</div>
                <div class="info-value">${establishmentInfo.categorie || 'Non renseigné'}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Enseigne commerciale</div>
                <div class="info-value">${establishmentInfo.enseigneCommerciale || 'Non renseigné'}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Date d'ouverture prévue</div>
                <div class="info-value">${establishmentInfo.dateOuverturePrevue || 'Non renseigné'}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Registre de commerce</div>
                <div class="info-value">${establishmentInfo.registreCommerce || 'Non renseigné'}</div>
              </div>
              <div class="info-item">
                <div class="info-label">ICE</div>
                <div class="info-value">${establishmentInfo.ice || 'Non renseigné'}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Numéro CNSS</div>
                <div class="info-value">${establishmentInfo.numeroCNSS || 'Non renseigné'}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Téléphone</div>
                <div class="info-value">${establishmentInfo.telephone || 'Non renseigné'}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Email</div>
                <div class="info-value">${establishmentInfo.email || 'Non renseigné'}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Site web</div>
                <div class="info-value">${establishmentInfo.siteWeb || 'Non renseigné'}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Région</div>
                <div class="info-value">${establishmentInfo.region || 'Non renseigné'}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Province</div>
                <div class="info-value">${establishmentInfo.province || 'Non renseigné'}</div>
              </div>
            </div>
          </div>

          <!-- Questionnaire de conformité -->
          <div class="section">
            <div class="section-title">Questionnaire de Conformité</div>
            ${Object.keys(complianceAnswers).length > 0 ? `
            <table class="questionnaire-table">
              <thead>
                <tr>
                  <th>Question</th>
                  <th>Réponse</th>
                </tr>
              </thead>
              <tbody>
                ${Object.entries(complianceAnswers).map(([key, value]) => {
                  const questionMap = {
                    'securite_incendie': 'Système de sécurité incendie',
                    'installations_electriques': 'Installations électriques aux normes',
                    'evacuation_eaux_usees': 'Système d\'évacuation des eaux usées conforme',
                    'normes_hygiene': 'Respect des normes d\'hygiène',
                    'fenetres_lumiere_naturelle': 'Fenêtres avec lumière naturelle',
                    'acces_handicapes': 'Accès pour personnes à mobilité réduite',
                    'espace_detente': 'Espace détente et de repos',
                    'espace_cure': 'Espace de cure',
                    'equipements_animation': 'Équipements d\'animation',
                    'jardin_enfants': 'Jardin d\'enfants ou club d\'enfants',
                    'salle_sport': 'Salle de sport',
                    'structures_sportives': 'Structures dédiées aux activités sportives',
                    'parcours_golf': 'Parcours de golf',
                    'gestion_proprietaire': 'Gestion par le propriétaire',
                    'gestion_societe': 'Gestion par une société de gestion',
                    'chaine_hoteliere': 'Appartenant à une chaine hôtelière',
                    'gestion_personne_physique': 'Gestion par une personne physique'
                  };
                  return `
                    <tr>
                      <td>${questionMap[key] || key}</td>
                      <td>${value === 'yes' ? 'Oui' : value === 'no' ? 'Non' : value || 'Non renseigné'}</td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
            ` : '<p>Aucune réponse au questionnaire fournie</p>'}
          </div>

          <!-- Documents uploadés -->
          <div class="section">
            <div class="section-title">Documents Uploadés</div>
            <ul class="files-list">
              ${uploadedFiles.length > 0 ? uploadedFiles.map(file => {
                const displayName = file.documentType ? 
                  `${file.uploadedByName || 'Utilisateur'} - ${file.documentType.toUpperCase()}` : 
                  (file.originalname || file.filename);
                return `<li>${displayName}</li>`;
              }).join('') : '<li>Aucun document uploadé</li>'}
            </ul>
          </div>

          <!-- Photos uploadées -->
          <div class="section">
            <div class="section-title">Photos Uploadées</div>
            <ul class="files-list">
              ${uploadedPhotos.length > 0 ? uploadedPhotos.map(photo => {
                const displayName = photo.documentType ? 
                  `${photo.uploadedByName || 'Utilisateur'} - ${photo.documentType.toUpperCase()}` : 
                  (photo.originalname || photo.filename);
                return `<li>${displayName}</li>`;
              }).join('') : '<li>Aucune photo uploadée</li>'}
            </ul>
          </div>

          <!-- Paiement -->
          <div class="section">
            <div class="section-title">Informations de Paiement</div>
            <div class="info-grid">
              <div class="info-item">
                <div class="info-label">Statut du paiement</div>
                <div class="info-value">${dossier.paymentStatus || 'Non payé'}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Montant payé</div>
                <div class="info-value">${dossier.amountPaid ? (dossier.amountPaid / 100) + ' MAD' : 'Non payé'}</div>
              </div>
            </div>
          </div>
        </div>

        <div class="footer">
          <p><strong>Formalitys</strong> - Régularisation de location touristique au Maroc</p>
          <p>Ce document a été généré automatiquement le ${new Date().toLocaleString('fr-FR')}</p>
        </div>
      </body>
      </html>
    `;
  }
}
