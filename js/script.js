document.addEventListener('DOMContentLoaded', () => {
    // Typing Animation
    const roles = ["Cloud Engineer", "AWS Solutions Architect", "DevOps Enthusiast", "Infrastructure Designer"];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingElement = document.getElementById('typingText');

    function typeEffect() {
        if (!typingElement) return;
        const currentRole = roles[roleIndex];
        if (isDeleting) {
            typingElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === currentRole.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typeSpeed = 500;
        }
        setTimeout(typeEffect, typeSpeed);
    }
    typeEffect();

    // Scroll Reveal
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    
    function initScrollReveal() {
        document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));
    }
    initScrollReveal();

    // Animated Particles
    const particlesContainer = document.getElementById('particles');
    if (particlesContainer) {
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.className = 'absolute rounded-full bg-cyan-400/20 pointer-events-none';
            const size = Math.random() * 4 + 2;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animation = `float ${Math.random() * 6 + 4}s ease-in-out infinite`;
            particle.style.animationDelay = Math.random() * 5 + 's';
            particlesContainer.appendChild(particle);
        }
    }

    // Projects Database
    const projects = [
        {
            id: 1,
            title: "Hybrid Cloud HomeLab Infrastructure",
            shortDesc: "Designed and implemented a hybrid cloud environment combining on-premises infrastructure with AWS resources.",
            longDesc: "Enterprise-grade hybrid cloud infrastructure built on Raspberry Pi 5 with Docker, AWS integration, CI/CD automation, intelligent DNS routing, and full observability via Grafana & Prometheus. Self-hosted with GitHub Actions runners to simulate real-world hybrid operations.",
            categories: ["cloud", "devops"],
            technologies: ["AWS", "Raspberry Pi 5", "Docker", "Grafana", "Prometheus", "Nginx", "GitHub Actions", "Ubuntu"],
            achievements: [
                "Configured secure connectivity between local and cloud environments.",
                "Implemented centralized infrastructure management and DNS routing.",
                "Practiced cloud administration, networking, and operational troubleshooting.",
                "Established a foundation for cloud migration and hybrid infrastructure concepts."
            ],
            github: "https://github.com/Dharunr257/Hybrid-Cloud-HomeLab-Infrastructure",
            repoName: "Hybrid-Cloud-HomeLab-Infrastructure",
            icon: "fa-server",
            accentClass: "from-orange-400/20 to-red-500/20",
            iconColor: "text-orange-400"
        },
        {
            id: 2,
            title: "Production-Ready Two-Tier Application with CI/CD",
            shortDesc: "Built and automated deployment of a Dockerized Flask-MySQL application using Jenkins CI/CD pipelines on AWS.",
            longDesc: "Fully automated 8-stage CI/CD pipeline testing, scanning, building, deploying, and self-healing a Dockerized Flask + MySQL app on AWS. Triggered by a single git push. Integrated Trivy security scanning, automated database migrations, and failure rollback.",
            categories: ["devops"],
            technologies: ["AWS", "Docker", "Jenkins", "Flask", "MySQL", "CloudWatch", "Trivy", "EC2", "VPC"],
            achievements: [
                "Built and deployed a Dockerized Flask application with MySQL backend.",
                "Implemented CI/CD pipelines including automated testing, security scanning, deployment, and rollback.",
                "Integrated CloudWatch monitoring and alerting for host metrics.",
                "Applied DevSecOps practices using vulnerability scanning."
            ],
            github: "https://github.com/Dharunr257/production-ready-two-tier-flask-app",
            repoName: "production-ready-two-tier-flask-app",
            icon: "fa-infinity",
            accentClass: "from-blue-400/20 to-cyan-500/20",
            iconColor: "text-blue-400"
        },
        {
            id: 3,
            title: "Real-Time AWS ChatOps Solution",
            shortDesc: "Developed a serverless ChatOps platform enabling real-time AWS operations and cost visibility directly from Slack.",
            longDesc: "Production-style serverless ChatOps solution enabling real-time AWS infrastructure operations, monitoring, cost visibility, and security validation directly from Slack using API Gateway, Lambda, and Cost Explorer API.",
            categories: ["cloud", "devops"],
            technologies: ["Slack API", "AWS Lambda", "API Gateway", "CloudWatch", "Cost Explorer", "Python", "Secrets Manager"],
            achievements: [
                "Developed a serverless ChatOps platform integrated with Slack.",
                "Automated EC2 lifecycle management operations via Slack slash commands.",
                "Implemented infrastructure monitoring and cost visibility commands.",
                "Integrated CloudWatch metrics and AWS Cost Explorer reporting.",
                "Improved operational efficiency through self-service cloud operations."
            ],
            github: "https://github.com/Dharunr257/Real-Time-Serverless-AWS-ChatOps-Solution-from-Slack",
            repoName: "Real-Time-Serverless-AWS-ChatOps-Solution-from-Slack",
            icon: "fa-slack",
            accentClass: "from-purple-400/20 to-pink-500/20",
            iconColor: "text-purple-400"
        },
        {
            id: 4,
            title: "Automated AWS Cost Governance & Remediation Platform",
            shortDesc: "Engineered an event-driven AWS governance solution that automatically detects, reports, and remediates cloud cost waste.",
            longDesc: "Event-driven serverless FinOps platform that detects cloud waste (unused EIPs, unattached EBS, idle EC2), routes findings through Slack approval workflows, auto-remediates approved resources, and delivers executive reports.",
            categories: ["cloud", "automation"],
            technologies: ["AWS Lambda", "EventBridge", "DynamoDB", "SNS", "Slack", "Python", "Boto3", "S3"],
            achievements: [
                "Built an automated governance solution for AWS cost optimization.",
                "Detected unused Elastic IPs, unattached EBS volumes, and idle EC2 instances.",
                "Implemented interactive Slack approval workflows before remediation.",
                "Automated corrective actions through Lambda functions, saving up to 30% in test accounts."
            ],
            github: "https://github.com/Dharunr257/Automated-AWS-Cost-Governance-Remediation-Platform",
            repoName: "Automated-AWS-Cost-Governance-Remediation-Platform",
            icon: "fa-coins",
            accentClass: "from-green-400/20 to-cyan-400/20",
            iconColor: "text-green-400"
        },
        {
            id: 5,
            title: "Enterprise AWS Infrastructure Provisioning Platform",
            shortDesc: "Implemented a modular Infrastructure-as-Code platform using Terraform for automated AWS provisioning.",
            longDesc: "Modular Infrastructure-as-Code (IaC) setup using Terraform. Designed reusable modules for multi-environment (Dev, Staging, Prod) VPCs, IAM least-privilege policies, security groups, and EC2 instances with remote state locking.",
            categories: ["devops", "automation"],
            technologies: ["Terraform", "AWS", "Infrastructure as Code", "S3 Backend", "DynamoDB Lock", "VPC Module"],
            achievements: [
                "Built reusable Terraform modules for enterprise infrastructure deployments.",
                "Implemented remote state management using S3 and DynamoDB locking.",
                "Designed multi-environment infrastructure deployments (Dev/Prod separation).",
                "Automated provisioning of VPCs, IAM roles, Security Groups, and EC2 instances."
            ],
            github: "https://github.com/Dharunr257/terraform-aws-infrastructure-platform",
            repoName: "terraform-aws-infrastructure-platform",
            icon: "fa-network-wired",
            accentClass: "from-cyan-400/20 to-blue-500/20",
            iconColor: "text-cyan-400"
        },
        {
            id: 6,
            title: "Highly Available Multi-Tier Application Platform",
            shortDesc: "Architected a self-healing multi-tier AWS platform leveraging Load Balancing, Auto Scaling, and RDS.",
            longDesc: "Designed a production-style multi-tier web application architecture hosted on AWS within a highly available, self-healing infrastructure. Configured under multi-AZ deployment with Application Load Balancers and Auto Scaling.",
            categories: ["cloud"],
            technologies: ["AWS VPC", "Auto Scaling", "ALB", "RDS Multi-AZ", "CloudWatch", "Docker", "Route 53"],
            achievements: [
                "Designed a highly available application platform using AWS best practices.",
                "Configured Application Load Balancer and Auto Scaling Groups (ASG).",
                "Integrated RDS database backend with secure private subnets network architecture.",
                "Built CloudWatch dashboards and custom alert thresholds."
            ],
            github: "https://github.com/Dharunr257/aws-ha-multitier-platform",
            repoName: "aws-ha-multitier-platform",
            icon: "fa-shield-alt",
            accentClass: "from-green-400/20 to-emerald-500/20",
            iconColor: "text-green-400"
        },
        {
            id: 7,
            title: "Kubernetes Platform Engineering Project",
            shortDesc: "Built and managed containerized workloads on Kubernetes clusters with scaling, networking, and RBAC controls.",
            longDesc: "Configured Kubernetes platform resources to orchestrate containerized application components. Implemented scaling, cluster networking, secure config management, and namespace-level access controls.",
            categories: ["devops"],
            technologies: ["Kubernetes", "Docker", "AWS EKS", "Ingress Controller", "HPA", "ConfigMaps", "RBAC"],
            achievements: [
                "Deployed containerized applications on Kubernetes clusters.",
                "Implemented Deployments, ClusterIP/NodePort Services, and Nginx Ingress.",
                "Configured Horizontal Pod Autoscaling (HPA) based on CPU utilization.",
                "Applied namespace isolation and role-based access control (RBAC)."
            ],
            github: "https://github.com/Dharunr257",
            repoName: "", // No specific repo, defaults to profile
            icon: "fa-cubes",
            accentClass: "from-blue-500/20 to-indigo-600/20",
            iconColor: "text-blue-500"
        },
        {
            id: 8,
            title: "GitOps Continuous Delivery Platform",
            shortDesc: "Implemented GitOps-based Kubernetes deployments using Argo CD to enable automated and auditable application delivery.",
            longDesc: "Set up declarative GitOps continuous delivery workflows for Kubernetes clusters using Argo CD. Automated synchronization between Git manifests and cluster state with automatic rollbacks.",
            categories: ["devops"],
            technologies: ["Argo CD", "Kubernetes", "GitOps", "Git", "YAML Declarative Manifests"],
            achievements: [
                "Implemented GitOps workflows using Argo CD.",
                "Enabled declarative application deployment management.",
                "Automated Kubernetes deployment synchronization.",
                "Configured auto-heal and rollback strategies."
            ],
            github: "https://github.com/Dharunr257",
            repoName: "", // Defaults to profile
            icon: "fa-code-branch",
            accentClass: "from-purple-500/20 to-violet-600/20",
            iconColor: "text-purple-400"
        },
        {
            id: 9,
            title: "Centralized Observability & Monitoring Platform",
            shortDesc: "Developed a centralized observability platform using Prometheus and Grafana to monitor infrastructure and application health.",
            longDesc: "Centralized metrics collection and dashboarding platform configured to scrape metrics from host machines and container workloads. Designed dashboards for system resource utilization, memory limits, and service availability.",
            categories: ["devops"],
            technologies: ["Prometheus", "Grafana", "Node Exporter", "Alertmanager", "Dashboarding", "Kubernetes"],
            achievements: [
                "Built centralized observability platform for infrastructure and applications.",
                "Implemented metrics collection using Prometheus.",
                "Created Grafana dashboards for operational visibility.",
                "Configured alerting for proactive incident detection."
            ],
            github: "https://github.com/Dharunr257/hchi-dashboard",
            repoName: "hchi-dashboard",
            icon: "fa-chart-line",
            accentClass: "from-pink-400/20 to-rose-500/20",
            iconColor: "text-pink-400"
        },
        {
            id: 10,
            title: "CloudPilot – AI-Powered Cloud Advisory Platform",
            shortDesc: "Developed an AI-driven cloud advisory platform focused on cost optimization, governance recommendations, and resource utilization.",
            longDesc: "Final year B.Tech project. Developed a full-stack platform that acts as a Cloud Advisor for students and startups, recommending cost-effective AWS instances and configurations powered by analytical rule engines.",
            categories: ["cloud", "fullstack"],
            technologies: ["React", "Node.js", "Express", "MongoDB", "MERN Stack", "AWS APIs", "Cost Optimization"],
            achievements: [
                "Designed a cloud advisory platform focused on cost optimization and governance.",
                "Integrated monitoring and budgeting capabilities.",
                "Applied cloud architecture and optimization concepts."
            ],
            github: "https://github.com/Dharunr257/CloudPilot-Right_Cloud-Right_Cost-Right_Time",
            repoName: "CloudPilot-Right_Cloud-Right_Cost-Right_Time",
            icon: "fa-plane",
            accentClass: "from-cyan-400/20 to-purple-500/20",
            iconColor: "text-cyan-400"
        },
        {
            id: 11,
            title: "Disaster Recovery Automation Simulator",
            shortDesc: "Simulated enterprise disaster recovery scenarios using AWS multi-region architectures and automated failover mechanisms.",
            longDesc: "Designed and evaluated disaster recovery strategies. Built simulated multi-region deployments on AWS using Route 53 DNS active-passive and active-active routing configurations to test RTO/RPO limits.",
            categories: ["cloud", "automation"],
            technologies: ["AWS Route 53", "Multi-Region Routing", "Active-Passive Failover", "RTO/RPO Metrics"],
            achievements: [
                "Designed multi-region disaster recovery architecture.",
                "Implemented Route 53 DNS failover mechanisms.",
                "Evaluated Recovery Time Objective (RTO) and Recovery Point Objective (RPO) metrics."
            ],
            github: "https://github.com/Dharunr257",
            repoName: "", // Defaults to profile
            icon: "fa-shield-heart",
            accentClass: "from-red-400/20 to-orange-500/20",
            iconColor: "text-red-400"
        },
        {
            id: 12,
            title: "Smart Supply Chain Management System",
            shortDesc: "Built a cloud-enabled supply chain management solution integrating inventory tracking and logistics workflows.",
            longDesc: "Full stack MERN application designed to manage supply chain logistics, inventory metrics, role-based dispatcher dashboards, and real-time transit status indicators.",
            categories: ["fullstack"],
            technologies: ["Node.js", "React", "Express", "MongoDB", "REST APIs", "Bootstrap", "Chart.js"],
            achievements: [
                "Developed logistics and inventory management solution.",
                "Integrated real-time data processing workflows.",
                "Improved operational visibility and forecasting capabilities."
            ],
            github: "https://github.com/Dharunr257/smart_supply_chain",
            repoName: "smart_supply_chain",
            icon: "fa-truck-ramp-box",
            accentClass: "from-yellow-400/20 to-amber-500/20",
            iconColor: "text-yellow-400"
        }
    ];

    const projectsContainer = document.getElementById('projectsGrid');
    const filterButtons = document.querySelectorAll('.filter-btn');

    // Render Projects Grid
    function renderProjects(filter = 'all') {
        if (!projectsContainer) return;
        projectsContainer.innerHTML = '';

        const filtered = filter === 'all' 
            ? projects 
            : projects.filter(p => p.categories.includes(filter));

        if (filtered.length === 0) {
            projectsContainer.innerHTML = `
                <div class="col-span-full text-center py-12 font-mono text-gray-400">
                    No projects found for category "${filter}".
                </div>
            `;
            return;
        }

        filtered.forEach((p, idx) => {
            const cardWrapper = document.createElement('div');
            cardWrapper.className = 'project-card-wrapper cursor-pointer scroll-reveal h-full';
            cardWrapper.innerHTML = createCardHTML(p);
            
            // Trigger open modal on card click
            cardWrapper.addEventListener('click', () => {
                openModal(p);
            });
            
            projectsContainer.appendChild(cardWrapper);
        });

        // Re-initialize intersection observers for new items
        initScrollReveal();
    }

    function createCardHTML(p) {
        const techTags = p.technologies.map(t => `<span class="tag px-2 py-0.5 rounded text-[11px] font-mono">${t}</span>`).join('');
        
        // Blog Link
        const blogUrl = p.repoName 
            ? `blog.html?repo=${p.repoName}` 
            : p.github;

        return `
            <div class="project-card glass-card rounded-2xl overflow-hidden border border-white/5 relative flex flex-col h-full hover:border-cyan-400/30 transition-all duration-300">
                <!-- Accent Line -->
                <div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-orange-500"></div>
                
                <!-- Decorative Background -->
                <div class="absolute inset-0 bg-gradient-to-br ${p.accentClass} opacity-[0.02] pointer-events-none"></div>
                
                <div class="p-5 flex-1 flex flex-col justify-between">
                    <div>
                        <div class="flex items-center gap-3 mb-3">
                            <div class="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center border border-white/10 flex-shrink-0">
                                <i class="fas ${p.icon} ${p.iconColor}"></i>
                            </div>
                            <h3 class="font-bold text-white text-md leading-tight">${p.title}</h3>
                        </div>
                        
                        <p class="text-gray-400 text-xs mb-4 leading-relaxed">${p.shortDesc}</p>
                    </div>
                    
                    <div>
                        <div class="flex flex-wrap gap-1.5 mb-5">
                            ${techTags}
                        </div>
                        
                        <div class="flex items-center justify-between pt-4 border-t border-white/5 mt-auto">
                            <span class="text-[11px] font-semibold font-mono text-cyan-400 group-hover:text-white transition-colors flex items-center gap-1">
                                <i class="fas fa-eye"></i> View Details
                            </span>
                            <div class="flex items-center gap-3">
                                <a href="${blogUrl}" target="_blank" onclick="event.stopPropagation()" class="text-[11px] font-mono text-purple-400 hover:text-white transition-colors flex items-center gap-1 relative z-20">
                                    <i class="fas fa-book"></i> Blog
                                </a>
                                <a href="${p.github}" target="_blank" onclick="event.stopPropagation()" class="text-[11px] font-mono text-gray-500 hover:text-white transition-colors flex items-center gap-1 relative z-20">
                                    <i class="fab fa-github"></i> Source
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // Modal Actions
    const modal = document.getElementById('projectModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalDesc = document.getElementById('modalDesc');
    const modalTech = document.getElementById('modalTech');
    const modalAchievements = document.getElementById('modalAchievements');
    const modalGithub = document.getElementById('modalGithub');
    const modalBlog = document.getElementById('modalBlog');
    const modalClose = document.getElementById('modalClose');

    function openModal(p) {
        if (!modal) return;
        
        modalTitle.textContent = p.title;
        modalDesc.textContent = p.longDesc;
        
        // Render tech stack badges in modal
        modalTech.innerHTML = p.technologies.map(t => `
            <span class="tag px-2.5 py-1 rounded-full text-xs font-mono">${t}</span>
        `).join('');

        // Render achievements list
        modalAchievements.innerHTML = p.achievements.map(a => `
            <li class="flex items-start gap-2.5 text-gray-300 text-sm">
                <i class="fas fa-chevron-right text-cyan-400 mt-1.5 text-[10px] flex-shrink-0"></i>
                <span>${a}</span>
            </li>
        `).join('');

        // Configure links
        modalGithub.href = p.github;
        modalBlog.href = p.repoName ? `blog.html?repo=${p.repoName}` : p.github;

        // Display modal
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        document.body.style.overflow = 'hidden'; // Stop body scrolling
    }

    function closeModal() {
        if (!modal) return;
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        document.body.style.overflow = ''; // Resume body scrolling
    }

    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }
    
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    }

    // Initialize Projects Rendering
    renderProjects('all');

    // Filter Buttons Handlers
    filterButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Remove active style from all buttons
            filterButtons.forEach(b => {
                b.classList.remove('bg-gradient-to-r', 'from-cyan-400', 'to-purple-500', 'text-white');
                b.classList.add('border-white/20', 'text-gray-400', 'hover:bg-white/5');
            });

            // Add active style to selected button
            const activeBtn = e.currentTarget;
            activeBtn.classList.add('bg-gradient-to-r', 'from-cyan-400', 'to-purple-500', 'text-white');
            activeBtn.classList.remove('border-white/20', 'text-gray-400', 'hover:bg-white/5');

            const category = activeBtn.getAttribute('data-filter');
            renderProjects(category);
        });
    });
});
