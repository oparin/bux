<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 2/23/15
 * Time: 10:50 AM
 */

namespace Bux\OfficeBundle\Form\Type\Upgrade;

use Bux\UserBundle\Entity\User;
use Doctrine\ORM\EntityRepository;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Validator\Constraints\NotBlank;

/**
 * Class UpgradeStatusFormType
 *
 * @package Bux\OfficeBundle\Form\Type\Upgrade
 */
class UpgradeStatusFormType extends AbstractType
{
    protected $user;

    /**
     * @param User $user
     */
    public function __construct(User $user)
    {
        $this->user = $user;
    }

    /**
     * @param FormBuilderInterface $builder
     * @param array                $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $user = $this->user;

        $builder
            ->add('status', 'entity', array(
                'class' => 'Bux\UserBundle\Entity\Membership',
                'property'  => 'name',
                'constraints' => array(
                    new NotBlank()
                ),
                'query_builder' => function(EntityRepository $er ) use ($user) {
                    return $er->createQueryBuilder('m')
                        ->orderBy('m.price', 'ASC')
                        ->where('m.id <> 1');
//                        ->setParameter(1, $user->getMembership()->getId());
                }
            ));
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'upgrade_status_form_type';
    }
}