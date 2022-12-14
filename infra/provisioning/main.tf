terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.46"
    }
  }

  required_version = ">= 1.2.0"
}

provider "aws" {
  region = "us-east-1"
}

resource "aws_instance" "master" {
  ami           = data.aws_ami.ubuntu.id
  instance_type = "t3.micro"

  tags = {
    Name = "master"
  }

  key_name        = aws_key_pair.ssh-key-pair.key_name
  security_groups = [aws_security_group.allow-ssh-access.name]
}

resource "aws_instance" "node01" {
  ami           = data.aws_ami.ubuntu.id
  instance_type = "t3.micro"

  tags = {
    Name = "node01"
  }

  key_name        = aws_key_pair.ssh-key-pair.key_name
  security_groups = [aws_security_group.allow-ssh-access.name]
}

resource "aws_instance" "node02" {
  ami           = data.aws_ami.ubuntu.id
  instance_type = "t3.micro"

  tags = {
    Name = "node02"
  }

  key_name        = aws_key_pair.ssh-key-pair.key_name
  security_groups = [aws_security_group.allow-ssh-access.name]
}

resource "aws_instance" "node03" {
  ami           = data.aws_ami.ubuntu.id
  instance_type = "t3.micro"

  tags = {
    Name = "node03"
  }

  key_name        = aws_key_pair.ssh-key-pair.key_name
  security_groups = [aws_security_group.allow-ssh-access.name]
}

data "aws_ami" "ubuntu" {
  most_recent = true

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-focal-20.04-amd64-server-*"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }

  owners = ["099720109477"]
}

resource "aws_security_group" "allow-ssh-access" {
  name        = "allow-ssh-access"
  description = "Allow SSH access to the instances"

  ingress {
    description = "SSH"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["${chomp(data.http.icanhazip.response_body)}/32"]
  }
}

resource "aws_key_pair" "ssh-key-pair" {
  public_key = data.local_file.ssh-pkey.content
}

data "http" "icanhazip" {
  url = "http://icanhazip.com"
}

data "local_file" "ssh-pkey" {
  filename = "../ssh/id_rsa.pub"
}

resource "local_file" "ansible_inventory" {
  file_permission = "0644"
  filename = "../configuration/inventory/main.yml"
  content = templatefile(
    "./inventory.tpl",
    {
      master_public_ip = aws_instance.master.public_ip,
      nodes_public_ips  = [
        aws_instance.node01.public_ip,
        aws_instance.node02.public_ip,
        aws_instance.node03.public_ip,
      ]
    }
  )
}