document.addEventListener('DOMContentLoaded', () => {
    // Typing Animation
    const roles = ["Cloud Engineer", "AWS Solutions Architect", "DevOps Engineer", "cloud Infrastructure Designer"];
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

    // Interactive Canvas Particles Background
    const canvas = document.getElementById('bg-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        let mouse = { x: null, y: null, radius: 150 };

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        };

        window.addEventListener('resize', resizeCanvas);
        window.addEventListener('mousemove', (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        });

        window.addEventListener('mouseleave', () => {
            mouse.x = null;
            mouse.y = null;
        });

        // Track touch events for mobile devices
        window.addEventListener('touchmove', (e) => {
            if (e.touches.length > 0) {
                mouse.x = e.touches[0].clientX;
                mouse.y = e.touches[0].clientY;
            }
        });

        window.addEventListener('touchend', () => {
            mouse.x = null;
            mouse.y = null;
        });

        class Particle {
            constructor(x, y, vx, vy, size, color) {
                this.x = x;
                this.y = y;
                this.vx = vx;
                this.vy = vy;
                this.size = size;
                this.color = color;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.fill();
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                // Bounce off edges
                if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
                if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;

                // Mouse interaction (gentle repulsion or drift)
                if (mouse.x !== null) {
                    const dx = mouse.x - this.x;
                    const dy = mouse.y - this.y;
                    const distance = Math.hypot(dx, dy);
                    if (distance < mouse.radius) {
                        const force = (mouse.radius - distance) / mouse.radius;
                        this.x -= dx / distance * force * 0.4;
                        this.y -= dy / distance * force * 0.4;
                    }
                }
                this.draw();
            }
        }

        const initParticles = () => {
            particles = [];
            const numberOfParticles = Math.min(Math.floor((canvas.width * canvas.height) / 16000), 80);
            for (let i = 0; i < numberOfParticles; i++) {
                const size = Math.random() * 2 + 0.8;
                const x = Math.random() * canvas.width;
                const y = Math.random() * canvas.height;
                const vx = (Math.random() - 0.5) * 0.35;
                const vy = (Math.random() - 0.5) * 0.35;
                const color = Math.random() > 0.5 ? 'rgba(0, 212, 255, 0.22)' : 'rgba(168, 85, 247, 0.22)';
                particles.push(new Particle(x, y, vx, vy, size, color));
            }
        };

        const drawConnections = () => {
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.hypot(dx, dy);

                    if (distance < 110) {
                        const opacity = (110 - distance) / 110 * 0.15;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(0, 212, 255, ${opacity})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }

                // Connect to mouse
                if (mouse.x !== null) {
                    const dx = particles[i].x - mouse.x;
                    const dy = particles[i].y - mouse.y;
                    const distance = Math.hypot(dx, dy);
                    if (distance < mouse.radius) {
                        const opacity = (mouse.radius - distance) / mouse.radius * 0.25;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(mouse.x, mouse.y);
                        ctx.strokeStyle = `rgba(168, 85, 247, ${opacity})`;
                        ctx.lineWidth = 0.6;
                        ctx.stroke();
                    }
                }
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => p.update());
            drawConnections();
            requestAnimationFrame(animate);
        };

        resizeCanvas();
        animate();
    }

    // Projects Database
    const projects = [
        {
            id: 1,
            title: "Hybrid Cloud HomeLab Infrastructure",
            categoryName: "Cloud & DevOps",
            categories: ["cloud", "devops"],
            shortDesc: "Designed and implemented a hybrid cloud environment combining on-premises infrastructure with AWS resources.",
            longDesc: "Enterprise-grade hybrid cloud infrastructure built on Raspberry Pi 5 with Docker, AWS integration, CI/CD automation, intelligent DNS routing, and full observability via Grafana & Prometheus. Self-hosted with GitHub Actions runners to simulate real-world hybrid operations.",
            keyOutcomes: "RPi5-based virtualization · Centralized DNS routing · GitOps deployment workflows · Unified host & container dashboards",
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
            categoryName: "DevOps & Pipelines",
            categories: ["devops"],
            shortDesc: "Built and automated deployment of a Dockerized Flask-MySQL application using Jenkins CI/CD pipelines on AWS.",
            longDesc: "Fully automated 8-stage CI/CD pipeline testing, scanning, building, deploying, and self-healing a Dockerized Flask + MySQL app on AWS. Triggered by a single git push. Integrated Trivy security scanning, automated database migrations, and failure rollback.",
            keyOutcomes: "8-stage Jenkins pipeline · Trivy security scanning · Automated DB migrations · Automated rollback on failure",
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
            categoryName: "Cloud & DevOps",
            categories: ["cloud", "devops"],
            shortDesc: "Developed a serverless ChatOps platform enabling real-time AWS operations and cost visibility directly from Slack.",
            longDesc: "Production-style serverless ChatOps solution enabling real-time AWS infrastructure operations, monitoring, cost visibility, and security validation directly from Slack using API Gateway, Lambda, and Cost Explorer API.",
            keyOutcomes: "AWS lifecycle control via Slack · Serverless Lambda architecture · Cost visibility explorer · IAM least-privilege enforcement",
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
            categoryName: "Automation & IaC",
            categories: ["automation"],
            shortDesc: "Serverless FinOps platform using Lambda, DynamoDB, and EventBridge to detect 3 categories of AWS resource waste, route approvals via Slack, and auto-remediate.",
            longDesc: "An event-driven FinOps automation engine evaluating resource utilization across AWS services to detect orphan resources and idle servers, reducing cost waste.",
            keyOutcomes: "3 waste types detected automatically · Slack approval workflow before remediation · Aligned to AWS Well-Architected Cost Optimization pillar · Governance reports generated",
            technologies: ["AWS Lambda", "DynamoDB", "EventBridge", "SNS", "Slack API", "Python", "Boto3", "IAM", "CloudWatch"],
            achievements: [
                "Identified and reported 3 distinct cloud resource waste structures automatically.",
                "Integrated interactive Slack workflow buttons to approve or reject cleanup actions.",
                "Enforced AWS Well-Architected optimization strategies, yielding significant test account savings.",
                "Generated weekly cost saving and action compliance execution sheets."
            ],
            github: "https://github.com/Dharunr257/aws-cost-governance-platform",
            repoName: "aws-cost-governance-platform",
            icon: "fa-coins",
            accentClass: "from-green-400/20 to-cyan-400/20",
            iconColor: "text-green-400"
        },
        {
            id: 5,
            title: "Enterprise AWS Infrastructure Provisioning Platform",
            categoryName: "Automation & IaC",
            categories: ["automation"],
            shortDesc: "Modular Terraform IaC platform provisioning multi-environment AWS infrastructure (dev/staging/prod) across VPC, EC2, RDS, and S3.",
            longDesc: "A production-grade modular Terraform platform designed for scalable, multi-environment AWS infrastructure deployment. It ensures environments remain identical, secure, and isolated.",
            keyOutcomes: "~70% reduction in provisioning time · Zero state conflicts via S3 + DynamoDB locking · Consistent tagging across all environments",
            technologies: ["Terraform", "AWS", "S3", "DynamoDB", "VPC", "EC2", "RDS", "Remote State", "Modules", "GitHub Actions"],
            achievements: [
                "Achieved ~70% reduction in infrastructure provisioning time.",
                "Prevented state conflicts using S3 remote backend and DynamoDB state locking.",
                "Enforced consistent tagging and cost governance across dev, staging, and prod."
            ],
            github: "https://github.com/Dharunr257/terraform-aws-infrastructure-platform",
            repoName: "terraform-aws-infrastructure-platform",
            icon: "fa-network-wired",
            accentClass: "from-cyan-400/20 to-blue-500/20",
            iconColor: "text-cyan-400"
        },
        {
            id: 6,
            title: "Highly Available Multi-Tier Application Platform on AWS",
            categoryName: "Cloud Architectures",
            categories: ["cloud"],
            shortDesc: "3-tier HA AWS architecture (ALB → EC2 Auto Scaling → RDS Multi-AZ) designed for 99.9% uptime with automated self-healing across 2 availability zones.",
            longDesc: "A resilient, self-healing three-tier architecture provisioning secure public/private subnets across multiple availability zones to eliminate single points of failure.",
            keyOutcomes: "99.9% uptime SLA design · 3-AZ deployment · Automated failover with ~60s RPO · Sub-500ms response under 3× load",
            technologies: ["AWS", "ALB", "EC2", "Auto Scaling", "RDS Multi-AZ", "CloudWatch", "Route 53", "VPC", "IAM"],
            achievements: [
                "Designed for a 99.9% uptime SLA with Multi-AZ redundancy.",
                "Automated load balancing and scaling across active Availability Zones.",
                "Configured RDS Multi-AZ failover achieving sub-60 second Recovery Point Objective.",
                "Maintained sub-500ms server response time under simulated 3x load conditions."
            ],
            github: "https://github.com/Dharunr257/highly-available-aws-platform",
            repoName: "highly-available-aws-platform",
            icon: "fa-shield-alt",
            accentClass: "from-green-400/20 to-emerald-500/20",
            iconColor: "text-green-400"
        },
        {
            id: 7,
            title: "Kubernetes Platform Engineering Project",
            categoryName: "DevOps & Pipelines",
            categories: ["devops"],
            shortDesc: "End-to-end Kubernetes platform with Deployments, Services, Ingress, RBAC, ConfigMaps, Secrets, and Horizontal Pod Autoscaling for containerized workloads.",
            longDesc: "A robust container orchestration platform implementation managing deployments, services, ingress configurations, cluster security, scaling, and cluster variables.",
            keyOutcomes: "Full RBAC model implemented · HPA configured for dynamic scaling · Secure Secrets management · Ingress routing across services",
            technologies: ["Kubernetes", "Docker", "HPA", "RBAC", "ConfigMaps", "Secrets", "Ingress", "Helm", "kubectl"],
            achievements: [
                "Implemented granular Role-Based Access Control (RBAC) rules for cluster authorization.",
                "Configured Horizontal Pod Autoscaler (HPA) to scale pods dynamically based on CPU/memory usage.",
                "Managed configuration settings and secure credentials with ConfigMaps and Secrets.",
                "Routed external traffic using Nginx Ingress Controller with custom path bindings."
            ],
            github: "https://github.com/Dharunr257/kubernetes-platform-engineering",
            repoName: "kubernetes-platform-engineering",
            icon: "fa-cubes",
            accentClass: "from-blue-500/20 to-indigo-600/20",
            iconColor: "text-blue-500"
        },
        {
            id: 8,
            title: "GitOps Continuous Delivery Platform",
            categoryName: "DevOps & Pipelines",
            categories: ["devops"],
            shortDesc: "GitOps-driven Kubernetes deployment platform using Argo CD enabling automated, version-controlled, and auditable application delivery from GitHub to cluster.",
            longDesc: "A complete continuous delivery solution leveraging Argo CD to synchronize cluster manifests, eliminating manual interventions and drifting configuration states.",
            keyOutcomes: "~60% reduction in deploy time · 100% GitOps-driven delivery · Full audit trail on every deployment · Automated rollback on failure",
            technologies: ["Argo CD", "Kubernetes", "GitHub Actions", "Docker", "GitOps", "Helm", "ECR", "CI/CD"],
            achievements: [
                "Reduced deployment execution and sync time by ~60%.",
                "Enforced a 100% GitOps workflow where Git is the single source of truth.",
                "Maintained complete history and audit trails for all configuration updates.",
                "Configured auto-remediation and instant rollback capabilities for failed builds."
            ],
            github: "https://github.com/Dharunr257/gitops-continuous-delivery-platform",
            repoName: "gitops-continuous-delivery-platform",
            icon: "fa-code-branch",
            accentClass: "from-purple-500/20 to-violet-600/20",
            iconColor: "text-purple-400"
        },
        {
            id: 9,
            title: "Observability & Monitoring Platform",
            categoryName: "DevOps & Pipelines",
            categories: ["devops"],
            shortDesc: "Centralized observability stack using Prometheus and Grafana to monitor infrastructure health, application metrics, and operational KPIs with alerting.",
            longDesc: "A unified logging and metrics system designed to capture system-level performance statistics, database requests, and application health points.",
            keyOutcomes: "Real-time dashboards for 10+ metrics · Alertmanager rules for 5 critical thresholds · Custom SLI/SLO tracking panels",
            technologies: ["Prometheus", "Grafana", "Alertmanager", "CloudWatch", "Node Exporter", "Docker", "Linux"],
            achievements: [
                "Constructed real-time visualization dashboards covering 10+ key performance parameters.",
                "Implemented proactive Alertmanager notification rules for 5 major host and application metrics.",
                "Built custom dashboards tracking SLIs, SLOs, and SLA targets for service availability."
            ],
            github: "https://github.com/Dharunr257/observability-monitoring-platform",
            repoName: "observability-monitoring-platform",
            icon: "fa-chart-line",
            accentClass: "from-pink-400/20 to-rose-500/20",
            iconColor: "text-pink-400"
        },
        {
            id: 10,
            title: "CloudPilot – AI-Powered Cloud Advisory Platform",
            categoryName: "Cloud & Full Stack",
            categories: ["cloud", "fullstack"],
            shortDesc: "Developed an AI-driven cloud advisory platform focused on cost optimization, governance recommendations, and resource utilization.",
            longDesc: "Final year B.Tech project. Developed a full-stack platform that acts as a Cloud Advisor for students and startups, recommending cost-effective AWS instances and configurations powered by analytical rule engines.",
            keyOutcomes: "AI-driven cost analysis · Automated instance recommendations · AWS metrics integration · Multi-tenant billing dashboards",
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
            categoryName: "Cloud & Automation",
            categories: ["cloud", "automation"],
            shortDesc: "Simulated enterprise disaster recovery scenarios using AWS multi-region architectures and automated failover mechanisms.",
            longDesc: "Designed and evaluated disaster recovery strategies. Built simulated multi-region deployments on AWS using Route 53 DNS active-passive and active-active routing configurations to test RTO/RPO limits.",
            keyOutcomes: "Multi-region failover automation · Route 53 DNS health checks · Under 60s RTO performance · Active-passive failover mock validation",
            technologies: ["AWS Route 53", "Multi-Region Routing", "Active-Passive Failover", "RTO/RPO Metrics"],
            achievements: [
                "Designed multi-region disaster recovery architecture.",
                "Implemented Route 53 DNS failover mechanisms.",
                "Evaluated Recovery Time Objective (RTO) and Recovery Point Objective (RPO) metrics."
            ],
            github: "https://github.com/Dharunr257",
            repoName: "",
            icon: "fa-shield-heart",
            accentClass: "from-red-400/20 to-orange-500/20",
            iconColor: "text-red-400"
        },
        {
            id: 12,
            title: "Smart Supply Chain Management System",
            categoryName: "Full Stack",
            categories: ["fullstack"],
            shortDesc: "Built a cloud-enabled supply chain management solution integrating inventory tracking and logistics workflows.",
            longDesc: "Full stack MERN application designed to manage supply chain logistics, inventory metrics, role-based dispatcher dashboards, and real-time transit status indicators.",
            keyOutcomes: "MERN-based platform · Secure REST endpoints · Role-based permissions · Dynamic status graphs",
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
            cardWrapper.className = `project-card-wrapper cursor-pointer scroll-reveal h-full stagger-${(idx % 6) + 1}`;
            cardWrapper.innerHTML = createCardHTML(p);
            
            // Trigger open modal on card click
            cardWrapper.addEventListener('click', () => {
                openModal(p);
            });
            
            projectsContainer.appendChild(cardWrapper);
        });

        // Re-initialize intersection observers for new items
        initScrollReveal();
        
        // Re-initialize 3D tilt interaction for newly created cards
        initTiltCards();
    }

    function createCardHTML(p) {
        const techTags = p.technologies.map(t => `<span class="tag px-2 py-0.5 rounded text-[11px] font-mono">${t}</span>`).join('');
        
        // Blog Link
        const blogUrl = p.repoName 
            ? `blog.html?repo=${p.repoName}` 
            : p.github;

        return `
            <div class="project-card glass-card rounded-2xl overflow-hidden border border-white/5 relative flex flex-col h-full hover:border-cyan-400/30 transition-all duration-300" data-tilt>
                <div class="spotlight"></div>
                <!-- Accent Line -->
                <div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-orange-500 z-10"></div>
                
                <!-- Decorative Background -->
                <div class="absolute inset-0 bg-gradient-to-br ${p.accentClass} opacity-[0.02] pointer-events-none"></div>
                
                <div class="p-5 flex-1 flex flex-col justify-between">
                    <div>
                        <div class="flex items-center justify-between mb-3">
                            <div class="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center border border-white/10 flex-shrink-0">
                                <i class="fas ${p.icon} ${p.iconColor}"></i>
                            </div>
                            <span class="px-2 py-0.5 rounded bg-cyan-400/10 border border-cyan-400/20 text-cyan-400 text-[10px] font-mono font-semibold">${p.categoryName}</span>
                        </div>
                        
                        <h3 class="font-bold text-white text-md leading-tight mb-2">${p.title}</h3>
                        <p class="text-gray-400 text-xs mb-4 leading-relaxed">${p.shortDesc}</p>
                        
                        <div class="mb-4 text-xs">
                            <span class="text-gray-400 font-mono text-[10px] block mb-1 uppercase tracking-wider">Key Outcomes:</span>
                            <span class="text-gray-300 text-[11px] font-mono">${p.keyOutcomes}</span>
                        </div>
                    </div>
                    
                    <div>
                        <div class="flex flex-wrap gap-1.5 mb-5">
                            ${techTags}
                        </div>
                        
                        <div class="flex items-center justify-between pt-4 border-t border-white/5 mt-auto">
                            <span class="text-[11px] font-semibold font-mono text-cyan-400 hover:text-white transition-colors flex items-center gap-1">
                                <i class="fas fa-eye"></i> View Details
                            </span>
                            <div class="flex items-center gap-2">
                                <a href="${blogUrl}" target="_blank" onclick="event.stopPropagation()" class="text-[11px] font-mono text-purple-400 hover:text-white transition-colors flex items-center gap-1 relative z-20 mr-1">
                                    <i class="fas fa-book"></i> Blog
                                </a>
                                <a href="${p.github}" target="_blank" onclick="event.stopPropagation()" class="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-[11px] font-mono text-white transition-all flex items-center gap-1.5 relative z-20">
                                    <i class="fab fa-github"></i> GitHub
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

    // Formspree AJAX Handler
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('form-success');
    const formError = document.getElementById('form-error');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Hide previous status messages
            if (formSuccess) formSuccess.style.display = 'none';
            if (formError) formError.style.display = 'none';

            const formData = new FormData(contactForm);
            
            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    // Success
                    if (formSuccess) formSuccess.style.display = 'block';
                    contactForm.reset();
                    contactForm.style.display = 'none'; // Hide the form on success
                } else {
                    // Failure
                    const data = await response.json();
                    if (formError) {
                        if (data && data.errors) {
                            formError.textContent = `✗ Error: ${data.errors.map(err => err.message).join(', ')}`;
                        } else {
                            formError.textContent = `✗ Failed to send message. Please try again or email me directly.`;
                        }
                        formError.style.display = 'block';
                    }
                }
            } catch (err) {
                // Connection/fetch error
                if (formError) {
                    formError.textContent = `✗ Connection error. Please try again or email me directly.`;
                    formError.style.display = 'block';
                }
            }
        });
    }

    // Initialize Lenis smooth scroll
    let lenis;
    try {
        lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            mouseMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
            infinite: false,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
    } catch (e) {
        console.warn("Lenis smooth scroll not initialized:", e);
    }

    // Scroll progress bar
    const progressBar = document.getElementById('scrollProgress');
    if (progressBar || lenis) {
        const updateProgress = () => {
            const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
            if (scrollTotal > 0) {
                const scrollPercent = (window.scrollY / scrollTotal) * 100;
                if (progressBar) {
                    progressBar.style.width = `${scrollPercent}%`;
                }
            }
        };
        window.addEventListener('scroll', updateProgress);
        if (lenis) {
            lenis.on('scroll', updateProgress);
        }
    }

    // Stats Count-Up Animation
    const stats = document.querySelectorAll('.stat-number');
    if (stats.length > 0) {
        const runCountUp = (target) => {
            const endVal = parseInt(target.getAttribute('data-target'), 10) || 0;
            const prefix = target.getAttribute('data-prefix') || '';
            const suffix = target.getAttribute('data-suffix') || '';
            let startVal = 0;
            const duration = 2000; // 2 seconds
            const startTime = performance.now();

            const animate = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // Easing function (easeOutQuad)
                const easedProgress = progress * (2 - progress);
                
                const currentVal = Math.floor(startVal + (endVal - startVal) * easedProgress);
                target.textContent = `${prefix}${currentVal}${suffix}`;

                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    target.textContent = `${prefix}${endVal}${suffix}`;
                }
            };
            requestAnimationFrame(animate);
        };

        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                    entry.target.classList.add('counted');
                    runCountUp(entry.target);
                }
            });
        }, { threshold: 0.5 });

        stats.forEach(s => statsObserver.observe(s));
    }

    // 3D Card Tilt & Spotlight Glow Helper
    function initTiltCards() {
        const tiltCards = document.querySelectorAll('[data-tilt]');
        tiltCards.forEach(card => {
            if (card.classList.contains('tilt-initialized')) return;
            card.classList.add('tilt-initialized');

            const spotlight = card.querySelector('.spotlight');
            let rect = null;
            
            card.style.transition = 'transform 0.1s ease-out, box-shadow 0.1s ease-out';
            
            card.addEventListener('mouseenter', () => {
                rect = card.getBoundingClientRect();
            });
            
            card.addEventListener('mousemove', (e) => {
                if (!rect) {
                    rect = card.getBoundingClientRect();
                }
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const width = rect.width;
                const height = rect.height;
                const rotateX = ((y / height) - 0.5) * 10; // rotate range -5 to 5 deg
                const rotateY = -((x / width) - 0.5) * 10; // rotate range -5 to 5 deg
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`;
                
                if (spotlight) {
                    spotlight.style.background = `radial-gradient(350px circle at ${x}px ${y}px, rgba(6, 182, 212, 0.12), transparent 80%)`;
                    spotlight.style.opacity = '1';
                }
            });
            
            card.addEventListener('mouseleave', () => {
                rect = null;
                card.style.transition = 'transform 0.5s ease-out, box-shadow 0.5s ease-out';
                card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
                if (spotlight) {
                    spotlight.style.opacity = '0';
                }
            });
        });
    }

    // Initialize 3D tilt interaction
    initTiltCards();

    // Explicit Smooth Scroll click handler for links (works properly without any refresh)
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            if (targetId === '#') return;
            const targetEl = document.querySelector(targetId);
            if (targetEl) {
                e.preventDefault();
                
                // Close mobile menu if visible
                const mobileMenu = document.getElementById('mobileMenu');
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                }

                if (typeof lenis !== 'undefined' && lenis) {
                    lenis.scrollTo(targetEl, {
                        offset: -80,
                        immediate: false,
                        onComplete: () => {
                            // Instantly force reveal checks
                            document.querySelectorAll('.scroll-reveal').forEach(el => {
                                const rect = el.getBoundingClientRect();
                                if (rect.top < window.innerHeight && rect.bottom > 0) {
                                    el.classList.add('visible');
                                }
                            });
                        }
                    });
                } else {
                    const navbarHeight = 70;
                    const targetPosition = targetEl.getBoundingClientRect().top + window.scrollY - navbarHeight;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // ScrollSpy: highlight active menu links on scroll
    const sectionsForSpy = document.querySelectorAll('section[id]');
    const navLinksForSpy = document.querySelectorAll('.nav-link[href^="#"]');
    
    if (sectionsForSpy.length > 0 && navLinksForSpy.length > 0) {
        const spyObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const activeId = entry.target.getAttribute('id');
                    navLinksForSpy.forEach(link => {
                        if (link.getAttribute('href') === `#${activeId}`) {
                            link.classList.add('active');
                        } else {
                            link.classList.remove('active');
                        }
                    });
                }
            });
        }, { 
            rootMargin: '-20% 0px -60% 0px'
        });
        
        sectionsForSpy.forEach(sec => spyObserver.observe(sec));
    }

    // Visitor/View Count Simulator (increments on reload, saves to localStorage)
    const visitCountEl = document.getElementById('visitCount');
    if (visitCountEl) {
        let count = localStorage.getItem('dharun_visit_count');
        if (!count) {
            count = 1916; // Reference count from screenshot
            localStorage.setItem('dharun_visit_count', count);
        } else {
            count = parseInt(count, 10) + 1;
            localStorage.setItem('dharun_visit_count', count);
        }
        visitCountEl.textContent = count.toLocaleString();
    }

    // Fixed Bottom Action Bar Toggle & Scroll-to-Top Action
    const bottomActionBar = document.getElementById('bottomActionBar');
    const scrollToTopBtn = document.getElementById('scrollToTop');

    if (bottomActionBar) {
        const toggleBottomBar = () => {
            if (window.scrollY > 250) {
                bottomActionBar.classList.remove('translate-y-20', 'opacity-0');
                bottomActionBar.classList.add('translate-y-0', 'opacity-100');
            } else {
                bottomActionBar.classList.remove('translate-y-0', 'opacity-100');
                bottomActionBar.classList.add('translate-y-20', 'opacity-0');
            }
        };

        // Scroll listener (both window and Lenis if active)
        window.addEventListener('scroll', toggleBottomBar);
        if (typeof lenis !== 'undefined' && lenis) {
            lenis.on('scroll', toggleBottomBar);
        }
        
        // Run once on load in case page is already scrolled
        toggleBottomBar();
    }

    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (typeof lenis !== 'undefined' && lenis) {
                lenis.scrollTo(0, {
                    duration: 1.5,
                    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
                });
            } else {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        });
    }
});
